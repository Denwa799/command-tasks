import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('user');
    const user = await this.userRepository.create({ ...dto, roles: [role] });
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.find({ relations: ['roles'] });
    return users;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
    return user;
  }

  async delete(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    return this.userRepository.remove(user);
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['roles'],
    });
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      const newUser = await this.userRepository.merge(user, { roles: [role] });
      this.userRepository.save(newUser);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    user.banned = true;
    user.banReason = dto.banReason;
    await this.userRepository.save(user);
  }
}
