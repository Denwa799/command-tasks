import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEmailDto } from './dto/user-email.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/api/users/users.service';
import { generateRandomString } from 'src/utils';
import { EmailRecoveryDto } from './dto/email-recovery.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private usersService: UsersService,
  ) {}

  async checkEmail(dto: UserEmailDto): Promise<string> {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);

    try {
      const generatedCode = Math.floor(Math.random() * 1000000);
      await this.usersService.addActivatedCode(user.id, generatedCode);
      await this.mailerService.sendMail({
        to: dto.email,
        from: process.env.MAIL_USER,
        subject: 'Код подтверждения почты',
        text: `Ваш код подтверждения: ${generatedCode}`,
      });
      return 'Письмо отправлено';
    } catch (error) {
      console.log('Ошибка отправки письма с кодом подтверждения = ', error);
      throw new HttpException('Ошибка отправки письма', HttpStatus.BAD_GATEWAY);
    }
  }

  async passwordRecovery(dto: EmailRecoveryDto): Promise<string> {
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);

    const codeEquals = await bcrypt.compare(
      String(dto.code),
      user.hashedActiveCode,
    );
    if (!codeEquals)
      throw new HttpException('Код неверный', HttpStatus.BAD_REQUEST);

    try {
      const newPassword = generateRandomString();

      await this.usersService.setNewPassword(user, newPassword);
      await this.mailerService.sendMail({
        to: dto.email,
        from: process.env.MAIL_USER,
        subject: 'Новый пароль от аккаунта',
        text: `Ваш новый пароль: ${newPassword}`,
      });

      return 'Пароль отправлен на почту';
    } catch (error) {
      console.log('Ошибка восстановления пароля по почте = ', error);
      throw new HttpException(
        'Ошибка восстановления пароля',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
