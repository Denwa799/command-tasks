import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'Пустое поле пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly password: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО' })
  @IsNotEmpty({ message: 'Пустое поле ФИО' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
