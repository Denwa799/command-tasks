import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Гастрит', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'Id команды' })
  @IsNumber()
  readonly teamId: number;
}
