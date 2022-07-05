import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'Id пользователя' })
  readonly userId: number;

  @ApiProperty({
    example: 'Плохо поведение',
    description: 'Причина получения бана',
  })
  readonly banReason: string;
}
