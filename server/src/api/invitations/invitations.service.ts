import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
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

  async create(dto: CreateInvitationDto, token: string) {
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

  async getAllInvitations(token: string, take = 50, skip = 0) {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitations = await this.invitationRepository.find({
        where: {
          user: { id: decoded.id },
        },
        take,
        skip,
        order: {
          id: 'DESC',
        },
      });
      if (invitations) return invitations;
      throw new HttpException('Приглашения не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async delete(id: number, token: string): Promise<Invitation> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const invitation = await this.invitationRepository.findOneBy({
        id,
        user: {
          id: decoded.id,
        },
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

  async updateRead(dto: UpdateReadInvitationDto, token) {
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
}
