import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { UpdateReadInvitationDto } from './dto/update-read-invitation.dto';
import { Invitation } from './invitations.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    private userService: UsersService,
    private teamsService: TeamsService,
    private jwtService: JwtService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async create(dto: CreateInvitationDto, token: string): Promise<Invitation> {
    const decoded = await this.decodeToken(token);
    const user = await this.userService.findUserByEmail(dto.userEmail);
    const team = await this.teamsService.getTeamById(dto.teamId, token);
    if (decoded && user && team) {
      const invitation = await this.invitationRepository.findOne({
        where: {
          user: { id: user.id },
          team: { id: dto.teamId },
        },
      });
      if (invitation)
        throw new HttpException(
          'Приглашение уже отправлено',
          HttpStatus.BAD_REQUEST,
        );

      const newInvitation = await this.invitationRepository.create({
        message: dto.message,
        team,
        user,
        isAccepted: false,
        isRead: false,
      });
      if (newInvitation) return this.invitationRepository.save(newInvitation);
      throw new HttpException('Приглашение не создано', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async getAllInvitations(
    token: string,
    take = 50,
    skip = 0,
  ): Promise<{ count: number; invitations: Invitation[] }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const [invitations, invitationsCount] =
        await this.invitationRepository.findAndCount({
          where: {
            user: { id: decoded.id },
          },
          take,
          skip,
          order: {
            id: 'DESC',
          },
        });
      if (invitations) return { count: invitationsCount, invitations };
      throw new HttpException('Приглашения не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async getAllTeamInvitations(
    token: string,
    teamId: number,
    take = 50,
    skip = 0,
  ): Promise<{ count: number; invitations: Invitation[] }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const [invitations, invitationsCount] =
        await this.invitationRepository.findAndCount({
          select: {
            id: true,
            message: true,
            isAccepted: true,
            isRead: true,
            team: {
              id: true,
              name: true,
            },
            user: {
              id: true,
              name: true,
              email: true,
            },
          },
          where: [
            {
              team: {
                id: teamId,
                users: {
                  id: decoded.id,
                },
              },
            },
            {
              team: {
                id: teamId,
                creator: {
                  id: decoded.id,
                },
              },
            },
          ],
          take,
          skip,
          order: {
            user: {
              id: 'DESC',
            },
          },
          relations: ['team', 'user'],
        });
      if (invitations) return { count: invitationsCount, invitations };
      throw new HttpException('Приглашения не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async delete(id: number, token: string): Promise<Invitation> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitation = await this.invitationRepository.findOne({
        where: [
          {
            id,
            user: {
              id: decoded.id,
            },
          },
          {
            id,
            team: {
              creator: {
                id: decoded.id,
              },
            },
          },
        ],
        relations: ['team'],
      });
      if (invitation) return this.invitationRepository.remove(invitation);
      throw new HttpException(
        'Ошибка удаления приглашения',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async update(
    id: number,
    dto: UpdateInvitationDto,
    token,
  ): Promise<Invitation> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitation = await this.invitationRepository.findOne({
        where: {
          id,
          user: {
            id: decoded.id,
          },
        },
        relations: ['team'],
      });
      if (invitation) {
        if (dto.isAccepted === true) {
          const team = this.teamsService.addActivatedUser(
            invitation.team.id,
            decoded.id,
          );
          if (!team)
            throw new HttpException(
              'Ошибка обновления приглашения',
              HttpStatus.BAD_REQUEST,
            );
          const newInvitation = await this.invitationRepository.merge(
            invitation,
            {
              isAccepted: dto.isAccepted,
            },
          );
          return this.invitationRepository.save(newInvitation);
        } else {
          const team = this.teamsService.removeActivatedUser(
            invitation.team.id,
            decoded.id,
          );
          if (!team)
            throw new HttpException(
              'Ошибка обновления приглашения',
              HttpStatus.BAD_REQUEST,
            );
          const newInvitation = await this.invitationRepository.merge(
            invitation,
            {
              isAccepted: dto.isAccepted,
            },
          );
          return this.invitationRepository.save(newInvitation);
        }
      }
      throw new HttpException(
        'Ошибка обновления приглашения',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async updateRead(dto: UpdateReadInvitationDto, token): Promise<string> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitations = [];
      for (const item of dto.id) {
        const invitation = await this.invitationRepository.findOne({
          where: {
            id: item,
            user: {
              id: decoded.id,
            },
          },
        });
        invitations.push(invitation);
      }
      if (invitations) {
        for (const item of invitations) {
          const newInvitation = await this.invitationRepository.merge(item, {
            isRead: true,
          });
          this.invitationRepository.save(newInvitation);
        }

        return 'Приглашения прочитаны';
      }
      throw new HttpException(
        'Ошибка обновления приглашения',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async recreate(
    id: number,
    token: string,
  ): Promise<{
    id: number;
    message: string;
    isAccepted: boolean;
    isRead: boolean;
    team: {
      id: number;
      name: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
    };
  }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitation = await this.invitationRepository.findOne({
        where: {
          id: id,
          team: {
            creator: {
              id: decoded.id,
            },
          },
        },
        relations: {
          team: {
            creator: true,
          },
          user: true,
        },
      });

      if (!invitation)
        throw new HttpException(
          'Ошибка пересоздания приглашения',
          HttpStatus.NOT_FOUND,
        );

      await this.teamsService.removeActivatedUser(
        invitation.team.id,
        invitation.user.id,
      );
      const newInvitation = {
        message: `Приглашение в команду ${invitation.team.name} от ${invitation.team.creator.email}`,
        team: invitation.team,
        user: invitation.user,
        isAccepted: false,
        isRead: false,
      };
      await this.delete(invitation.id, token);
      const createdInvitation = await this.invitationRepository.save(
        newInvitation,
      );
      return {
        id: createdInvitation.id,
        message: createdInvitation.message,
        isAccepted: createdInvitation.isAccepted,
        isRead: createdInvitation.isRead,
        team: {
          id: createdInvitation.team.id,
          name: createdInvitation.team.name,
        },
        user: {
          id: createdInvitation.user.id,
          name: createdInvitation.user.name,
          email: createdInvitation.user.email,
        },
      };
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }
}
