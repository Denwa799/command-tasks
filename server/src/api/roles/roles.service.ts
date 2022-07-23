import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async getAllRoles() {
    const roles = await this.roleRepository.find();
    if (roles) return roles;
    throw new HttpException('Роли не найдены', HttpStatus.NOT_FOUND);
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create({ ...dto });
    if (role) return this.roleRepository.save(role);
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value: value } });
    if (role) return role;
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  }
}
