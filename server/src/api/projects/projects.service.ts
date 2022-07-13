import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsService } from 'src/api/teams/teams.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private teamService: TeamsService,
  ) {}

  async create(dto: CreateProjectDto) {
    const team = await this.teamService.getTeamById(dto.teamId);

    if (team) {
      const project = await this.projectRepository.create({
        name: dto.name,
        team,
      });
      return this.projectRepository.save(project);
    }
    throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
  }

  async getAllProjects() {
    const projects = await this.projectRepository.find({
      relations: ['team', 'tasks'],
    });
    return projects;
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    return project;
  }

  async delete(id: number): Promise<Project | undefined> {
    const project = await this.projectRepository.findOneBy({ id });
    return this.projectRepository.remove(project);
  }
}
