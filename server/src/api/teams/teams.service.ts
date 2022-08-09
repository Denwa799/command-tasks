import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  ) {}

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

  async getAllTeams() {
    const teams = await this.teamRepository.find({ relations: ['projects'] });
    if (teams) return teams;
    throw new HttpException('Команды не найдены', HttpStatus.NOT_FOUND);
  }

  async getTeamById(id: number) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (team) return team;
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (team) return this.teamRepository.remove(team);
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: CreateTeamDto): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (team) {
      const newTeam = await this.teamRepository.merge(team, {
        name: dto.name,
      });
      return this.teamRepository.save(newTeam);
    }
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }
}
