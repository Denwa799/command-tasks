import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async create(dto: CreateProjectDto, token: string) {
    const team = await this.teamService.getTeamById(dto.teamId, token);

    if (team) {
      const project = await this.projectRepository.create({
        name: dto.name,
        team,
      });
      return this.projectRepository.save(project);
    }
    throw new HttpException('Ошибка создания проекта', HttpStatus.NOT_FOUND);
  }

  async getAllProjects(take = 50, skip = 0) {
    const projects = await this.projectRepository.find({
      relations: ['team', 'tasks'],
      take,
      skip,
      order: {
        id: 'ASC',
      },
    });
    if (projects) return projects;
    throw new HttpException('Проекты не найдены', HttpStatus.NOT_FOUND);
  }

  async getProjectById(id: number, token: string) {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const project = await this.projectRepository.findOne({
        where: [
          {
            id,
            team: {
              users: {
                id: decoded.id,
              },
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
        relations: ['tasks'],
        order: {
          tasks: {
            id: 'ASC',
          },
        },
      });
      if (project) return project;
      throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async delete(id: number, token: string): Promise<Project> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const project = await this.projectRepository.findOneBy({
        id,
        team: {
          creator: {
            id: decoded.id,
          },
        },
      });
      if (project) return this.projectRepository.remove(project);
      throw new HttpException('Ошибка удаления проекта', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async update(id: number, dto: UpdateProjectDto, token): Promise<Project> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const project = await this.projectRepository.findOneBy({
        id,
        team: {
          creator: {
            id: decoded.id,
          },
        },
      });
      if (project) {
        const newProject = await this.projectRepository.merge(project, {
          name: dto.name,
        });
        return this.projectRepository.save(newProject);
      }
      throw new HttpException(
        'Ошибка обновления проекта',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }
}
