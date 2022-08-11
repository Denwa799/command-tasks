import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/api/roles/roles.service';
import { Like, Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('user');
    const user = await this.userRepository.create({ ...dto, roles: [role] });
    if (user) return this.userRepository.save(user);
    throw new HttpException('Пользователь не создан', HttpStatus.BAD_REQUEST);
  }

  async getAllUsers(take = 50, skip = 0) {
    const users = await this.userRepository.find({
      relations: ['roles'],
      take,
      skip,
    });
    if (users) return users;
    throw new HttpException('Пользователи не найдены', HttpStatus.BAD_REQUEST);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
    if (user) return user;
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async findUsersByEmail(email: string, take = 10, skip = 0): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { email: Like(`%${email}%`) },
      take,
      skip,
    });
    if (users) return users;
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (user) return user;
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async addRefreshToken(id: number, hashedToken: string | null) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      const newUser = await this.userRepository.merge(user, {
        hashedRt: hashedToken,
      });
      this.userRepository.save(newUser);
      return newUser;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) return this.userRepository.remove(user);
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: UpdateUserDto, token: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      const decoded = await this.decodeToken(token);

      if (decoded && decoded.id === user.id) {
        const newUser = await this.userRepository.merge(user, {
          name: dto.name,
        });
        await this.userRepository.save(newUser);
        const response = {
          name: newUser.name,
        };
        return response;
      }

      throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
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
