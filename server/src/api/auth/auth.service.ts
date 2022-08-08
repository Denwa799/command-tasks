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

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    const response = {
      email: user.email,
      name: user.name,
      tokens,
    };
    return response;
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = await this.generateTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    const response = {
      email: user.email,
      name: user.name,
      tokens,
    };
    return response;
  }

  async logout(userId: number) {
    await this.userService.addRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);

    if (user) {
      const refreshTokenEquals = await bcrypt.compare(
        refreshToken,
        user.hashedRt,
      );

      if (refreshTokenEquals) {
        const tokens = await this.generateTokens(user);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return {
          email: user.email,
          name: user.name,
          tokens,
        };
      }

      throw new HttpException('Доступ запрещен', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  private async generateTokens(user: User) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          roles: user.roles,
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
        },
        {
          secret: process.env.PRIVATE_KEY_REFRESH || 'SECRET_REF',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 5);
    await this.userService.addRefreshToken(userId, hashedToken);
  }

  private async validateUser(userDto: LoginUserDto) {
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
