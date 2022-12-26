import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/api/roles/roles.service';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  private async decodeToken(token: string) {
    return JSON.parse(JSON.stringify(this.jwtService.decode(token)));
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getRoleByValue('user');
    const user = await this.userRepository.create({
      email: dto.email,
      password: dto.password,
      name: dto.name,
      roles: [role],
    });
    if (user) return this.userRepository.save(user);
    throw new HttpException('Пользователь не создан', HttpStatus.BAD_REQUEST);
  }

  async getAllUsers(
    take = 50,
    skip = 0,
  ): Promise<{ count: number; users: User[] }> {
    const [users, usersCount] = await this.userRepository.findAndCount({
      relations: ['roles', 'teams'],
      take,
      skip,
      order: {
        id: 'DESC',
      },
    });
    if (users) return { count: usersCount, users };
    throw new HttpException('Пользователи не найдены', HttpStatus.BAD_REQUEST);
  }

  async getAllTeamUsers(
    token: string,
    teamId: number,
    take = 50,
    skip = 0,
  ): Promise<{ count: number; users: User[] }> {
    const decoded = await this.decodeToken(token);
    if (!decoded)
      throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);

    const [users, usersCount] = await this.userRepository.findAndCount({
      select: {
        id: true,
        email: true,
        name: true,
        teams: {
          id: true,
          creator: {
            id: true,
          },
          users: {
            id: true,
          },
        },
      },
      relations: {
        teams: {
          users: true,
          creator: true,
        },
      },
      take,
      skip,
      order: {
        id: 'DESC',
      },
      where: [
        {
          teams: {
            id: teamId,
            users: {
              id: decoded.id,
            },
          },
        },
        {
          teams: {
            id: teamId,
            creator: {
              id: decoded.id,
            },
          },
        },
      ],
    });
    return {
      count: usersCount,
      users,
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
    if (user) return user;
  }

  async findUsersByEmail(
    email: string,
    take = 10,
    skip = 0,
  ): Promise<{ count: number; users: User[] }> {
    const [users, usersCount] = await this.userRepository.findAndCount({
      where: { email: Like(`%${email}%`) },
      take,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
      },
      order: {
        name: 'ASC',
      },
    });
    if (users) return { count: usersCount, users };
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'teams'],
    });
    if (user) return user;
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async addRefreshToken(id: number, hashedToken: string | null): Promise<User> {
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

  async update(
    id: number,
    dto: UpdateUserDto,
    token: string,
  ): Promise<{ name: string }> {
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

  async changePassword(
    id: number,
    dto: ChangeUserPasswordDto,
    token: string,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    const decoded = await this.decodeToken(token);
    if (!decoded || decoded.id !== user.id)
      throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals)
      throw new HttpException(
        'Пароль должен отличаться',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcrypt.hash(
      dto.password,
      Number(process.env.HASH_SALT),
    );
    const newUser = await this.userRepository.merge(user, {
      password: hashPassword,
    });
    await this.userRepository.save(newUser);
    await this.mailService.sendMail(
      user.email,
      'Ваш пароль был сменен в приложении Tasks Tracker',
      'В вашем аккаунте был обновлен пароль. Если это были не вы, проведите сброс пароля в приложении',
    );

    return 'Пароль был успешно сменен';
  }

  async checkPasswordEquals(
    dto: ChangeUserPasswordDto,
    token: string,
  ): Promise<boolean> {
    const decoded = await this.decodeToken(token);
    if (!decoded)
      throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);

    const id = decoded.id;
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    return passwordEquals;
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
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

  async ban(dto: BanUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    user.banned = true;
    user.banReason = dto.banReason;
    await this.userRepository.save(user);
    return `Пользователь с id ${user.id} заблокирован`;
  }

  async changePremiumStatus(id): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    user.isPremium = !user.isPremium;
    const newUser = await this.userRepository.save(user);
    return `Премиум статус: ${newUser.isPremium}`;
  }

  async removeTeam(teamId, userId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['teams'],
    });
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    user.teams.filter((id) => id !== teamId);
    await this.userRepository.save(user);
    return `Команда с id ${teamId} удалена у пользователя с id ${userId}`;
  }

  async addActivatedCode(id: number, code: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      const hashCode = await bcrypt.hash(
        String(code),
        Number(process.env.HASH_SALT),
      );
      const newUser = await this.userRepository.merge(user, {
        hashedActiveCode: hashCode,
      });
      this.userRepository.save(newUser);
      return newUser;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async changeUserIsActive(user: User, isActive: boolean): Promise<User> {
    const newUser = await this.userRepository.merge(user, {
      isActive,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async setNewPassword(user: User, password: string): Promise<User> {
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT),
    );

    const newUser = await this.userRepository.merge(user, {
      password: hashPassword,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }
}
