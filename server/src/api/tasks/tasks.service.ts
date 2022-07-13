import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/api/projects/projects.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectsService,
  ) {}

  async create(dto: CreateTaskDto) {
    const project = await this.projectService.getProjectById(dto.projectId);

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
    return tasks;
  }

  async delete(id: number): Promise<Task | undefined> {
    const task = await this.taskRepository.findOneBy({ id });
    return this.taskRepository.remove(task);
  }
}
