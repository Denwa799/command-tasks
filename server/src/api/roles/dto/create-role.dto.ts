import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Название роли' })
  @IsNotEmpty({ message: 'Пустое поле названия' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 15, { message: 'Не меньше 3 и не больше 15' })
  readonly value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @IsNotEmpty({ message: 'Пустое поле описания' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
