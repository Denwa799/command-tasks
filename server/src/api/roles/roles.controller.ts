import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получение роли по value' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Обновление роли по id' })
  @ApiResponse({ status: 200, type: Role })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: CreateRoleDto) {
    return this.roleService.update(id, updateDto);
  }
}
