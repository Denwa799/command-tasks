import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNotEmpty({ message: 'Нет id пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;

  @ApiProperty({
    example: 'Плохо поведение',
    description: 'Причина получения бана',
  })
  @IsNotEmpty({ message: 'Пустое поле причины бана' })
  @IsString({ message: 'Должно быть строкой' })
  readonly banReason: string;
}
