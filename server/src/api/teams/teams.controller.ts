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
import { GetCurrentUser } from '../auth/decorators';
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
  getAll(@GetCurrentUser('accessToken') token: string) {
    return this.teamsService.getAllTeams(token);
  }

  @ApiOperation({ summary: 'Получение команды по id' })
  @ApiResponse({ status: 200, type: Team })
  @Get(':id')
  findTeamById(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.teamsService.getTeamById(id, token);
  }

  @ApiOperation({ summary: 'Удаление команды по id' })
  @ApiResponse({ status: 200, type: Team })
  @Delete(':id')
  delete(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.teamsService.delete(id, token);
  }

  @ApiOperation({ summary: 'Обновление команды по id' })
  @ApiResponse({ status: 200, type: Team })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() teamDto: CreateTeamDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.teamsService.update(id, teamDto, token);
  }
}
