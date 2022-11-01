import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckEmailDto } from './dto/check-email.dto';
import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private usersService: UsersService,
  ) {}

  async checkEmail(dto: CheckEmailDto): Promise<string> {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    if (user.isActive)
      throw new HttpException(
        'Пользователь уже активирован',
        HttpStatus.BAD_REQUEST,
      );

    try {
      const generatedCode = Math.floor(Math.random() * 1000000);
      await this.mailerService.sendMail({
        to: dto.email,
        from: process.env.MAIL_USER,
        subject: 'Подтверждение почты',
        text: `Ваш код подтверждения ${generatedCode}`,
      });
      await this.usersService.addActivatedCode(user.id, generatedCode);
      return 'Письмо отправлено';
    } catch (error) {
      console.log('Ошибка отправки письма для подтверждения почты = ', error);
    }
  }
}
