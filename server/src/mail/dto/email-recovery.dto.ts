import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EmailRecoveryDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Код подтверждения email' })
  @IsNotEmpty({ message: 'Пустое поле с кодом' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(1)
  @Max(999999)
  readonly code: number;
}
