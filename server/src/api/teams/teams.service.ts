import { Injectable } from '@nestjs/common';
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
    return this.teamRepository.save(team);
  }

  async getAllTeams() {
    const teams = await this.teamRepository.find({ relations: ['projects'] });
    return teams;
  }

  async getTeamById(id: number) {
    const team = await this.teamRepository.findOneBy({ id });
    return team;
  }

  async delete(id: number): Promise<Team | undefined> {
    const team = await this.teamRepository.findOneBy({ id });
    return this.teamRepository.remove(team);
  }
}
