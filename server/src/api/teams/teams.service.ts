import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async create(dto: CreateTeamDto) {
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
      });
      if (team) return this.teamRepository.save(team);
      throw new HttpException('Команда не создана', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async getAllTeams(token: string, take = 50, skip = 0) {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const teams = await this.teamRepository.find({
        where: [{ users: { id: decoded.id } }, { creator: { id: decoded.id } }],
        relations: ['projects'],
        take,
        skip,
        order: {
          id: 'ASC',
        },
      });
      if (teams) return teams;
      throw new HttpException('Команды не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async getTeamById(id: number, token: string) {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const team = await this.teamRepository.findOne({
        select: {
          creator: {
            id: true,
          },
        },
        where: [
          { id, users: { id: decoded.id } },
          { id, creator: { id: decoded.id } },
        ],
        relations: ['projects', 'creator'],
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

  async update(id: number, dto: CreateTeamDto, token): Promise<Team> {
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
}
