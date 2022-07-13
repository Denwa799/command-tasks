import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Tokens } from './types';
import { RefreshTokenGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({ status: 200 })
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200 })
  @Public()
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() userDto: CreateUserDto): Promise<Tokens> {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Выход' })
  @ApiResponse({ status: 200 })
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @ApiOperation({ summary: 'Обновление подключения' })
  @ApiResponse({ status: 200 })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    console.log('token');
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
