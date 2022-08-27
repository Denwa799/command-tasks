import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty({
    example: 'Приглашение в команду Сочинение от test@test.ru',
    description: 'Текст сообщения',
  })
  @IsNotEmpty({ message: 'Пустое поле сообщения' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(20, 200, { message: 'Не меньше 20 и не больше 200 символов' })
  readonly message: string;

  @ApiProperty({ example: '1', description: 'Id команды' })
  @IsNotEmpty({ message: 'Пустое поле id команды' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(1)
  readonly teamId: number;

  @ApiProperty({
    example: 'test@test.ru',
    description: 'email приглашаемого пользователя',
  })
  @IsNotEmpty({ message: 'Пустое поле email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly userEmail: string;
}
