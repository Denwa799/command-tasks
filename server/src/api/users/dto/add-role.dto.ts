import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
  @IsNotEmpty({ message: 'Пустое поле названия' })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNotEmpty({ message: 'Нет id пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
