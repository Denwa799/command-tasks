import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail() {
    await this.mailerService
      .sendMail({
        to: 'madara312000@yandex.ru',
        from: process.env.MAIL_USER,
        subject: 'Проверка nest js',
        text: 'Это письмо с smtp сервера',
      })
      .catch((error) => {
        console.log('Ошибка отправки тестового письма = ', error);
      });
    return 'Отправлено';
  }

  async checkEmail(dto: CheckEmailDto): Promise<string> {
    const generatedCode = Math.floor(Math.random() * 1000000);

    await this.mailerService
      .sendMail({
        to: dto.email,
        from: process.env.MAIL_USER,
        subject: 'Подтверждение почты',
        text: `Ваш код подтверждения ${generatedCode}`,
      })
      .catch((error) => {
        console.log('Ошибка отправки письма для подтверждения почты = ', error);
      });
    return 'Письмо отправлено';
  }
}
