import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { TaskStatusType } from '../tasks.type';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Найти персонал', description: 'Текст задачи' })
  @IsNotEmpty({ message: 'Пустое поле текста' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 500, { message: 'Не меньше 3 и не больше 500' })
  readonly text: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО ответственного' })
  @IsNotEmpty({ message: 'Пустое поле ФИО' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({ message: 'Должно быть email' })
  @Length(3, 345, { message: 'Не меньше 3 и не больше 345' })
  readonly responsible: string;

  @ApiProperty({ example: 'overdue', description: 'Статус' })
  @IsNotEmpty({ message: 'Пустое поле статуса' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 10, { message: 'Не меньше 4 и не больше 10' })
  readonly status: TaskStatusType;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @IsNotEmpty({ message: 'Пустое поле "срочно"' })
  @IsBoolean({ message: 'Должна быть истина или ложь' })
  readonly isUrgently: boolean;

  @ApiProperty({
    example: '2022-07-04',
    description: 'Дата задачи в календаре',
  })
  @IsNotEmpty({ message: 'Пустое поле даты' })
  @IsDate({ message: 'Должно быть датой' })
  @Type(() => Date)
  readonly date: Date;
}
