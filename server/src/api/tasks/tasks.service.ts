import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/api/projects/projects.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectsService,
    private jwtService: JwtService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async create(dto: CreateTaskDto, token) {
    const project = await this.projectService.getProjectById(
      dto.projectId,
      token,
    );

    if (project) {
      const task = await this.taskRepository.create({
        text: dto.text,
        responsible: dto.responsible,
        status: dto.status,
        isUrgently: dto.isUrgently,
        date: dto.date,
        project,
      });
      return this.taskRepository.save(task);
    }
    throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
  }

  async getAllTasks() {
    const tasks = await this.taskRepository.find({ relations: ['project'] });
    if (tasks) return tasks;
    throw new HttpException('Задачи не найдены', HttpStatus.NOT_FOUND);
  }

  async delete(id: number, token): Promise<Task> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const task = await this.taskRepository.findOneBy({
        id,
        project: {
          team: {
            creator: {
              id: decoded.id,
            },
          },
        },
      });
      if (task) return this.taskRepository.remove(task);
      throw new HttpException('Ошибка удаления задачи', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async update(id: number, dto: UpdateTaskDto, token): Promise<Task> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const task = await this.taskRepository.findOneBy({
        id,
        project: {
          team: {
            creator: {
              id: decoded.id,
            },
          },
        },
      });
      if (task) {
        const newTask = await this.taskRepository.merge(task, {
          text: dto.text,
          responsible: dto.responsible,
          status: dto.status,
          isUrgently: dto.isUrgently,
          date: dto.date,
        });
        return this.taskRepository.save(newTask);
      }
      throw new HttpException('Ошибка обновления задачи', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }
}
