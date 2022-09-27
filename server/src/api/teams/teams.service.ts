import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { InvitationsService } from '../invitations/invitations.service';
import { UsersService } from '../users/users.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => InvitationsService))
    private invitationsService: InvitationsService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async getAllUserTeams(
    token: string,
    take = 50,
    skip = 0,
  ): Promise<{ count: number; teams: Team[] }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const [teams, teamsCount] = await this.teamRepository.findAndCount({
        select: {
          id: true,
          name: true,
          creator: {
            id: true,
          },
        },
        where: [
          {
            users: { id: decoded.id },
            activatedUsers: ArrayContains([decoded.id]),
          },
          { creator: { id: decoded.id } },
        ],
        relations: ['creator'],
        take,
        skip,
        order: {
          id: 'ASC',
        },
      });
      if (teams)
        return {
          count: teamsCount,
          teams,
        };
      throw new HttpException('Команды не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async create(dto: CreateTeamDto, token: string): Promise<string> {
    const creator = await this.userService.findUserById(dto.creator);
    if (creator) {
      const users = [];
      for (const email of dto.users) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
          throw new HttpException(
            'Пользователь не найден',
            HttpStatus.BAD_REQUEST,
          );
        }
        users.push(user);
      }
      const team = await this.teamRepository.create({
        name: dto.name,
        creator,
        users,
        activatedUsers: [],
      });
      if (team) {
        const savedTeam = await this.teamRepository.save(team);
        for (const user of users) {
          const invitationBody = {
            message: `Приглашение в команду ${dto.name} от ${creator.email}`,
            teamId: savedTeam.id,
            userEmail: user.email,
          };
          await this.invitationsService.create(invitationBody, token);
        }
        return 'Команда создана';
      }
      throw new HttpException('Команда не создана', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async getTeamById(id: number, token: string): Promise<Team> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const team = await this.teamRepository.findOne({
        select: {
          id: true,
          name: true,
          activatedUsers: true,
          projects: {
            id: true,
            name: true,
          },
          users: {
            id: true,
            email: true,
            name: true,
          },
          creator: {
            id: true,
            email: true,
            name: true,
          },
        },
        where: [
          {
            id,
            users: { id: decoded.id },
            activatedUsers: ArrayContains([decoded.id]),
          },
          { id, creator: { id: decoded.id } },
        ],
        relations: ['projects', 'creator', 'users'],
        order: {
          projects: {
            id: 'ASC',
          },
        },
      });
      if (team) return team;
      throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async delete(id: number, token: string): Promise<Team> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const team = await this.teamRepository.findOneBy({
        id,
        creator: {
          id: decoded.id,
        },
      });
      if (team) return this.teamRepository.remove(team);
      throw new HttpException('Ошибка удаления команды', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async update(id: number, dto: UpdateTeamDto, token): Promise<Team> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const team = await this.teamRepository.findOneBy({
        id,
        creator: {
          id: decoded.id,
        },
      });
      if (team) {
        const newTeam = await this.teamRepository.merge(team, {
          name: dto.name,
        });
        return this.teamRepository.save(newTeam);
      }
      throw new HttpException(
        'Ошибка обновления команды',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async addActivatedUser(id: number, userId: number): Promise<Team> {
    const team = await this.teamRepository.findOneBy({
      id,
    });
    if (team) {
      const activatedUsers = [...team.activatedUsers, userId];
      const newTeam = await this.teamRepository.merge(team, {
        activatedUsers,
      });
      return this.teamRepository.save(newTeam);
    }
    throw new HttpException('Ошибка обновления команды', HttpStatus.NOT_FOUND);
  }

  async removeActivatedUser(id: number, userId: number): Promise<Team> {
    const team = await this.teamRepository.findOneBy({
      id,
    });
    if (team) {
      const activatedUsers = team.activatedUsers.filter((id) => id != userId);
      const newTeam = await this.teamRepository.merge(team, {
        activatedUsers,
      });
      return this.teamRepository.save(newTeam);
    }
    throw new HttpException('Ошибка обновления команды', HttpStatus.NOT_FOUND);
  }

  async getAllTeams(
    take = 50,
    skip = 0,
  ): Promise<{ count: number; teams: Team[] }> {
    const [teams, teamsCount] = await this.teamRepository.findAndCount({
      select: {
        id: true,
        name: true,
        creator: {
          id: true,
        },
      },
      relations: ['creator'],
      take,
      skip,
      order: {
        id: 'ASC',
      },
    });
    if (teams) return { count: teamsCount, teams };
    throw new HttpException('Команды не найдены', HttpStatus.NOT_FOUND);
  }
}
