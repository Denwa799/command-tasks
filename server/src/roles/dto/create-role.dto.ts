import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Название роли' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 15, { message: 'Не меньше 3 и не больше 15' })
  readonly value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
