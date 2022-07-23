import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Найти персонал', description: 'Текст задачи' })
  @IsNotEmpty({ message: 'Пустое поле текста' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 500, { message: 'Не меньше 3 и не больше 500' })
  readonly text: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО ответственного' })
  @IsNotEmpty({ message: 'Пустое поле ФИО' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 50, { message: 'Не меньше 3 и не больше 50' })
  readonly responsible: string;

  @ApiProperty({ example: 'overdue', description: 'Статус' })
  @IsNotEmpty({ message: 'Пустое поле статуса' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 20, { message: 'Не меньше 3 и не больше 20' })
  readonly status: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @IsNotEmpty({ message: 'Пустое поле "срочно"' })
  @IsBoolean({ message: 'Должна быть истина или ложь' })
  readonly isUrgently: boolean;

  @ApiProperty({
    example: '2022-07-04',
    description: 'Дата задачи в календаре',
  })
  @IsNotEmpty({ message: 'Пустое поле даты' })
  @IsString({ message: 'Должно быть датой' })
  readonly date: string;
}
