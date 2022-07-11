import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Найти персонал', description: 'Текст задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 500, { message: 'Не меньше 3 и не больше 500' })
  readonly text: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО ответственного' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly responsible: string;

  @ApiProperty({ example: 'overdue', description: 'Статус' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 20, { message: 'Не меньше 3 и не больше 20' })
  readonly status: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @IsBoolean({ message: 'Должна быть истина или ложь' })
  readonly isUrgently: boolean;

  @ApiProperty({
    example: '2022-07-04',
    description: 'Дата задачи в календаре',
  })
  @IsString({ message: 'Должно быть датой' })
  readonly date: string;

  @ApiProperty({ example: '1', description: 'Id проекта' })
  @IsNumber()
  readonly projectId: number;
}
