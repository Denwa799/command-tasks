import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Сочинение', description: 'Название команды' })
  @IsNotEmpty({ message: 'Пустое поле названия' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'Id создателя' })
  @IsNotEmpty({ message: 'Пустое поле id создателя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(1)
  readonly creator: number;

  @ApiProperty({
    example: '[test@test.ru, test2@test.ru]',
    description: 'Массив с email пользователей',
  })
  @IsNotEmpty({ message: 'Пустое поле с массивом пользователей' })
  @IsArray({ message: 'Должно быть массивом' })
  readonly users: string[];
}
