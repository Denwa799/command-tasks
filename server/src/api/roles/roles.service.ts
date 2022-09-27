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

  async getAllRoles(
    take = 50,
    skip = 0,
  ): Promise<{ count: number; roles: Role[] }> {
    const [roles, rolesCount] = await this.roleRepository.findAndCount({
      take,
      skip,
      order: {
        id: 'ASC',
      },
    });
    if (roles) return { count: rolesCount, roles };
    throw new HttpException('Роли не найдены', HttpStatus.NOT_FOUND);
  }

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create({ ...dto });
    if (role) return this.roleRepository.save(role);
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value: value } });
    if (role) return role;
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (role) {
      const newRole = await this.roleRepository.merge(role, {
        value: dto.value,
        description: dto.description,
      });
      return this.roleRepository.save(newRole);
    }
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  }
}
