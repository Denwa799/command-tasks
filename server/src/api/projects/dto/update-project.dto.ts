import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Гастрит', description: 'Название проекта' })
  @IsNotEmpty({ message: 'Пустое поле названия' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly name: string;
}
