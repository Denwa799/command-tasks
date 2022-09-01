import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationQueryParamDto } from './dto/query-param.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  create(
    @Body() taskDto: CreateTaskDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.tasksService.create(taskDto, token);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll(@Query() reqParam: PaginationQueryParamDto) {
    return this.tasksService.getAllTasks(reqParam.take, reqParam.skip);
  }

  @ApiOperation({ summary: 'Удаление задачи по id' })
  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  delete(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.tasksService.delete(id, token);
  }

  @ApiOperation({ summary: 'Обновление задачи по id' })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateTaskDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.tasksService.update(id, updateDto, token);
  }
}
