import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
