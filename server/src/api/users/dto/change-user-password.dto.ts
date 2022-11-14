import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsNotEmpty({ message: 'Пустое поле пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly password: string;
}
