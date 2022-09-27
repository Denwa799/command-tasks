import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../auth/decorators';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { PaginationQueryParamDto } from './dto/query-param.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { UpdateReadInvitationDto } from './dto/update-read-invitation.dto';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';

@ApiTags('Приглашения')
@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @ApiOperation({ summary: 'Создание приглашения' })
  @ApiResponse({ status: 200, type: Invitation })
  @Post()
  create(
    @Body() invitationDto: CreateInvitationDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.invitationsService.create(invitationDto, token);
  }

  @ApiOperation({ summary: 'Получение всех приглашений' })
  @ApiResponse({ status: 200, type: [Invitation] })
  @Get()
  getAll(
    @Query() reqParam: PaginationQueryParamDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.invitationsService.getAllInvitations(
      token,
      reqParam.take,
      reqParam.skip,
    );
  }

  @ApiOperation({
    summary: 'Обновление статуса прочитанно для массива приглашений',
  })
  @ApiResponse({ status: 200, description: 'Приглашения прочитаны' })
  @Patch('/read')
  updateRead(
    @Body() invitationDto: UpdateReadInvitationDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.invitationsService.updateRead(invitationDto, token);
  }

  @ApiOperation({ summary: 'Удаление приглашения по id' })
  @ApiResponse({ status: 200, type: Invitation })
  @Delete(':id')
  delete(
    @Param('id') id: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.invitationsService.delete(id, token);
  }

  @ApiOperation({ summary: 'Обновление приглашения по id' })
  @ApiResponse({ status: 200, type: Invitation })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() invitationDto: UpdateInvitationDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.invitationsService.update(id, invitationDto, token);
  }
}
