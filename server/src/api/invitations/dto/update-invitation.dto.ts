import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateInvitationDto {
  @ApiProperty({
    example: 'true',
    description: 'Принято приглашение или нет',
  })
  @IsNotEmpty({ message: 'Пустое поле' })
  @IsBoolean({ message: 'Должно быть логическим оператором' })
  readonly isAccepted: boolean;
}
