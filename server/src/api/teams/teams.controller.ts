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
import { CreateTeamDto } from './dto/create-team.dto';
import { PaginationQueryParamDto } from './dto/query-param.dto';
import { Team } from './teams.entity';
import { TeamsService } from './teams.service';

@ApiTags('Команды')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Получение всех команд пользователя' })
  @ApiResponse({ status: 200, type: [Team] })
  @Get()
  getAllUserTeams(
    @Query() reqParam: PaginationQueryParamDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.teamsService.getAllUserTeams(
      token,
      reqParam.take,
      reqParam.skip,
    );
  }

  @ApiOperation({ summary: 'Получение всех команд. Только для администратора' })
  @ApiResponse({ status: 200, type: [Team] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('admin')
  getAllTeams(@Query() reqParam: PaginationQueryParamDto) {
    return this.teamsService.getAllTeams(reqParam.take, reqParam.skip);
  }

  @ApiOperation({ summary: 'Создание команды' })
  @ApiResponse({ status: 200, type: 'Команда создана' })
  @Post()
  create(
    @Body() teamDto: CreateTeamDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.teamsService.create(teamDto, token);
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
