import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { TaskStatusType } from '../tasks.type';

export class UpdateStatusTaskDto {
  @ApiProperty({ example: 'overdue', description: 'Статус' })
  @IsNotEmpty({ message: 'Пустое поле статуса' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 10, { message: 'Не меньше 4 и не больше 10' })
  readonly status: TaskStatusType;
}
