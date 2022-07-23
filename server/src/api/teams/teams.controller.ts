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
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './teams.entity';
import { TeamsService } from './teams.service';

@ApiTags('Команды')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Создание команды' })
  @ApiResponse({ status: 200, type: Team })
  @Post()
  create(@Body() teamDto: CreateTeamDto) {
    return this.teamsService.create(teamDto);
  }

  @ApiOperation({ summary: 'Получение всех команд' })
  @ApiResponse({ status: 200, type: [Team] })
  @Get()
  getAll() {
    return this.teamsService.getAllTeams();
  }

  @ApiOperation({ summary: 'Удаление команды по id' })
  @ApiResponse({ status: 200, type: Team })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teamsService.delete(id);
  }

  @ApiOperation({ summary: 'Обновление команды по id' })
  @ApiResponse({ status: 200, type: Team })
  @Patch(':id')
  update(@Param('id') id: number, @Body() teamDto: CreateTeamDto) {
    return this.teamsService.update(id, teamDto);
  }
}
