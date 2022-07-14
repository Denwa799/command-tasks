import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Гастрит', description: 'Название проекта' })
  @IsNotEmpty({ message: 'Пустое поле названия' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'Id команды' })
  @IsNotEmpty({ message: 'Нет id команды' })
  @IsNumber()
  readonly teamId: number;
}
