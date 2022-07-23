import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsService } from 'src/api/teams/teams.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
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
    if (projects) return projects;
    throw new HttpException('Проекты не найдены', HttpStatus.NOT_FOUND);
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (project) return project;
    throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    if (project) return this.projectRepository.remove(project);
    throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    if (project) {
      const newProject = await this.projectRepository.merge(project, {
        name: dto.name,
      });
      return this.projectRepository.save(newProject);
    }
    throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
  }
}
