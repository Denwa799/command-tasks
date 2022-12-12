import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { UsersService } from 'src/api/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/api/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Tokens } from './types';
import { stringReverse } from 'src/utils';
import { UserActivationDto } from './dto/user-activation.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto): Promise<{
    id: number;
    email: string;
    name: string;
    tokens: Tokens;
  }> {
    const user = await this.validateUser(userDto);
    if (!user.isActive)
      throw new HttpException('Email не подтвержден', HttpStatus.FORBIDDEN);

    const tokens = await this.generateTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      tokens,
    };
    return response;
  }

  async registration(userDto: CreateUserDto): Promise<{
    id: number;
    email: string;
    name: string;
  }> {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    const hashPassword = await bcrypt.hash(
      userDto.password,
      Number(process.env.HASH_SALT),
    );
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return response;
  }

  async logout(userId: number) {
    await this.userService.addRefreshToken(userId, null);
    return 'Выход выполнен';
  }

  async userActivation(dto: UserActivationDto): Promise<string> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    if (user.isActive)
      throw new HttpException(
        'Пользователь уже активирован',
        HttpStatus.BAD_REQUEST,
      );
    if (!user.hashedActiveCode)
      throw new HttpException('Код небыл отправлен', HttpStatus.BAD_REQUEST);
    const codeEquals = await bcrypt.compare(
      String(dto.code),
      user.hashedActiveCode,
    );
    if (!codeEquals)
      throw new HttpException('Код не совпадает', HttpStatus.BAD_REQUEST);

    await this.userService.changeUserIsActive(user, true);

    return 'Email подтвержден';
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<{
    id: number;
    email: string;
    name: string;
    tokens: Tokens;
  }> {
    const user = await this.userService.findUserById(userId);

    if (user) {
      const refreshTokenEquals = await bcrypt.compare(
        stringReverse(refreshToken),
        user.hashedRt,
      );

      if (refreshTokenEquals) {
        const tokens = await this.generateTokens(user);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tokens,
        };
      }

      throw new HttpException('Доступ запрещен', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          roles: user.roles,
          isActive: user.isActive,
        },
        {
          secret: process.env.PRIVATE_KEY || 'SECRET',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          roles: user.roles,
          isActive: user.isActive,
        },
        {
          secret: process.env.PRIVATE_KEY_REFRESH || 'SECRET_REF',
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(
      stringReverse(refreshToken),
      Number(process.env.HASH_SALT),
    );
    await this.userService.addRefreshToken(userId, hashedToken);
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.findUserByEmail(userDto.email);

    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
