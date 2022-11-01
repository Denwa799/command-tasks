import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UserActivationDto {
  @ApiProperty({ example: '123456', description: 'Код активации' })
  @IsNotEmpty({ message: 'Пустое поле с кодом активации' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(1)
  @Max(999999)
  readonly code: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
