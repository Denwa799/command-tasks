import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'Пустое поле пароля' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly password: string;
}
