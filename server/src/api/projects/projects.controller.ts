import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Post()
  create(
    @Body() projectDto: CreateProjectDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.projectsService.create(projectDto, token);
  }

  @ApiOperation({ summary: 'Получение всех проектов' })
  @ApiResponse({ status: 200, type: [Project] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.projectsService.getAllProjects();
  }

  @ApiOperation({ summary: 'Получение проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':id')
  findProjectById(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.projectsService.getProjectById(id, token);
  }

  @ApiOperation({ summary: 'Удаление проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  @Delete(':id')
  delete(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.projectsService.delete(id, token);
  }

  @ApiOperation({ summary: 'Обновление проекта по id' })
  @ApiResponse({ status: 200, type: Project })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateProjectDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.projectsService.update(id, updateDto, token);
  }
}
