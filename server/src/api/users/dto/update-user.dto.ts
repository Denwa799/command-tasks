import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО' })
  @IsNotEmpty({ message: 'Пустое поле ФИО' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
