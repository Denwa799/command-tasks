import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Post()
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectsService.create(projectDto);
  }

  @ApiOperation({ summary: 'Получение всех проектов' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get()
  getAll() {
    return this.projectsService.getAllProjects();
  }

  @ApiOperation({ summary: 'Получение проекта по id' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get(':id')
  findProjectById(@Param('id') id: number) {
    return this.projectsService.getProjectById(id);
  }

  @ApiOperation({ summary: 'Удаление проекта по id' })
  @ApiResponse({ status: 200, type: [Project] })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.projectsService.delete(id);
  }
}
