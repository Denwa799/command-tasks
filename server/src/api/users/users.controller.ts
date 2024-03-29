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
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import {
  EmailQueryParamDto,
  PaginationQueryParamDto,
} from './dto/query-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Проверка старого пароля пользователя' })
  @ApiResponse({ status: 200, description: 'true' })
  @Post('/check-password-equals')
  checkPasswordEquals(
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.usersService.checkPasswordEquals(changeUserPasswordDto, token);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll(@Query() reqParam: PaginationQueryParamDto) {
    return this.usersService.getAllUsers(reqParam.take, reqParam.skip);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('team/:id')
  getAllTeamUsers(
    @Query() reqParam: PaginationQueryParamDto,
    @Param('id') teamId: number,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.usersService.getAllTeamUsers(
      token,
      teamId,
      reqParam.take,
      reqParam.skip,
    );
  }

  @ApiOperation({ summary: 'Получение пользователей по email' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/email')
  getUsersByEmail(@Query() reqParam: EmailQueryParamDto) {
    return this.usersService.findUsersByEmail(
      reqParam.email,
      reqParam.take,
      reqParam.skip,
    );
  }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Смена пароля пользователя по id' })
  @ApiResponse({ status: 200, description: 'Пароль был успешно сменен' })
  @Patch('/change-password/:id')
  changePassword(
    @Param('id') id: number,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.usersService.changePassword(id, changeUserPasswordDto, token);
  }

  @ApiOperation({ summary: 'Обновление пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserDto,
    @GetCurrentUser('accessToken') token: string,
  ) {
    return this.usersService.update(id, updateDto, token);
  }

  @ApiOperation({ summary: 'Изменение премиум статуса пользователя' })
  @ApiResponse({ status: 200, description: 'Премиум статус: true' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch('/premium/:id')
  changePremiumStatus(@Param('id') id: number) {
    return this.usersService.changePremiumStatus(id);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя по id' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
