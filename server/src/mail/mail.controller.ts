import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class MailController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('/test')
  async sendTestEmail() {
    await this.mailerService
      .sendMail({
        to: 'madara312000@yandex.ru',
        from: 'denwa799@yandex.ru',
        subject: 'Проверка nest js',
        text: 'Это письмо с smtp сервера',
      })
      .catch((error) => {
        console.log('error = ', error);
      });
    return 'Отправлено';
  }
}
