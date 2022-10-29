import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/api/projects/projects.service';
import { ArrayContains, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TaskStatusType } from './tasks.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectsService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async getAllProjectTasks(
    token: string,
    id: number,
    take = 50,
    skip = 0,
  ): Promise<{ count: number; tasks: Task[] }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const [tasks, tasksCount] = await this.taskRepository.findAndCount({
        select: {
          id: true,
          text: true,
          responsible: {
            id: true,
            email: true,
            name: true,
          },
          status: true,
          isUrgently: true,
          date: true,
          project: {
            id: true,
            name: true,
            team: {
              id: true,
              name: true,
              users: {
                id: true,
                email: true,
                name: true,
              },
              activatedUsers: true,
              creator: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        where: [
          {
            project: {
              id: id,
              team: {
                creator: {
                  id: decoded.id,
                },
              },
            },
          },
          {
            project: {
              id: id,
              team: {
                users: {
                  id: decoded.id,
                },
                activatedUsers: ArrayContains([decoded.id]),
              },
            },
          },
        ],
        relations: {
          responsible: true,
          project: {
            team: {
              creator: true,
              users: true,
            },
          },
        },
        take,
        skip,
        order: {
          id: 'ASC',
        },
      });
      if (tasks) return { count: tasksCount, tasks };
      throw new HttpException('Задачи не найдены', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async create(dto: CreateTaskDto, token): Promise<{ id: number }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const project = await this.projectService.getProjectById(
        dto.projectId,
        token,
      );
      const user = await this.userService.findUserByEmail(dto.responsible);
      const userInTeam = project.team.users.find((item) => item.id === user.id);
      if (
        project &&
        project.team.creator.id === decoded.id &&
        ((userInTeam && project.team.activatedUsers.includes(userInTeam?.id)) ||
          project.team.creator.id === user.id)
      ) {
        const task = await this.taskRepository.create({
          text: dto.text,
          responsible: user,
          status: dto.status,
          isUrgently: dto.isUrgently,
          date: dto.date,
          project,
        });
        const createdTask = await this.taskRepository.save(task);
        return {
          id: createdTask.id,
        };
      }
      throw new HttpException('Ошибка создания задачи', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
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

  async update(
    id: number,
    dto: UpdateTaskDto,
    token,
  ): Promise<{
    id: number;
    text: string;
    status: string;
    isUrgently: boolean;
    date: Date;
    responsible: string;
  }> {
    const decoded = await this.decodeToken(token);
    if (decoded) {
      const task = await this.taskRepository.findOne({
        where: {
          id,
          project: {
            team: {
              creator: {
                id: decoded.id,
              },
            },
          },
        },
        relations: {
          project: {
            team: {
              creator: true,
              users: true,
            },
          },
        },
      });
      const user = await this.userService.findUserByEmail(dto.responsible);
      const userInTeam = task.project.team.users.find(
        (item) => item.id === user.id,
      );

      if (
        task &&
        task.project.team.creator.id === decoded.id &&
        ((userInTeam &&
          task.project.team.activatedUsers.includes(userInTeam?.id)) ||
          task.project.team.creator.id === user.id)
      ) {
        const newTask = await this.taskRepository.merge(task, {
          text: dto.text,
          responsible: user,
          status: dto.status,
          isUrgently: dto.isUrgently,
          date: dto.date,
        });
        const savedTask = await this.taskRepository.save(newTask);
        return {
          id: savedTask.id,
          text: savedTask.text,
          status: savedTask.status,
          isUrgently: savedTask.isUrgently,
          date: savedTask.date,
          responsible: savedTask.responsible.email,
        };
      }
      throw new HttpException('Ошибка обновления задачи', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
  }

  async updateStatus(
    id: number,
    dto: UpdateStatusTaskDto,
    token,
  ): Promise<{
    id: number;
    text: string;
    status: TaskStatusType;
    isUrgently: boolean;
    date: Date;
  }> {
    const decoded = await this.decodeToken(token);
    if (!decoded) {
      throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
    }

    const task = await this.taskRepository.findOne({
      relations: {
        project: {
          team: {
            creator: true,
            users: true,
          },
        },
      },
      where: [
        {
          id,
          project: {
            team: {
              creator: {
                id: decoded.id,
              },
            },
          },
        },
        {
          id,
          project: {
            team: {
              users: {
                id: decoded.id,
              },
              activatedUsers: ArrayContains([decoded.id]),
            },
          },
        },
      ],
    });
    if (!task) {
      throw new HttpException(
        'Ошибка обновления задачи',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTask = await this.taskRepository.merge(task, {
      status: dto.status,
    });
    const savedTask = await this.taskRepository.save(newTask);
    return {
      id: savedTask.id,
      text: savedTask.text,
      status: savedTask.status,
      isUrgently: savedTask.isUrgently,
      date: savedTask.date,
    };
  }

  async getAllTasks(
    take = 50,
    skip = 0,
  ): Promise<{ count: number; tasks: Task[] }> {
    const [tasks, tasksCount] = await this.taskRepository.findAndCount({
      relations: ['project'],
      take,
      skip,
      order: {
        id: 'DESC',
      },
    });
    if (tasks) return { count: tasksCount, tasks };
    throw new HttpException('Задачи не найдены', HttpStatus.NOT_FOUND);
  }
}
