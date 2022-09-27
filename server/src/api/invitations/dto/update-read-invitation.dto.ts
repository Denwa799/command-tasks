import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateReadInvitationDto {
  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'Массив с id приглашений, которые надо сделать прочитанными',
  })
  @IsNotEmpty({ message: 'Пустое поле с массивом id' })
  @IsArray({ message: 'Должно быть массивом' })
  readonly id: number[];
}
