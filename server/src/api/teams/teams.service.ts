import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateTeamDto) {
    const team = await this.teamRepository.create({ ...dto });
    if (team) return this.teamRepository.save(team);
    throw new HttpException('Команда не создана', HttpStatus.BAD_REQUEST);
  }

  async getAllTeams() {
    const teams = await this.teamRepository.find({ relations: ['projects'] });
    if (teams) return teams;
    throw new HttpException('Команды не найдены', HttpStatus.NOT_FOUND);
  }

  async getTeamById(id: number) {
    const team = await this.teamRepository.findOneBy({ id });
    if (team) return team;
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ id });
    if (team) return this.teamRepository.remove(team);
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }
}
