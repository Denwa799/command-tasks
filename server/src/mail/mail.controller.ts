import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/api/auth/decorators';
import { EmailRecoveryDto } from './dto/email-recovery.dto';
import { UserEmailDto } from './dto/user-email.dto';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}

  @ApiOperation({ summary: 'Отправка письма с кодом подтверждения email' })
  @ApiResponse({ status: 200, description: 'Письмо отправлено' })
  @Public()
  @Post('/check')
  checkEmail(@Body() userEmailDto: UserEmailDto) {
    return this.mailService.checkEmail(userEmailDto);
  }

  @ApiOperation({ summary: 'Отправка письма с новым паролем' })
  @ApiResponse({ status: 200, description: 'Пароль отправлен на почту' })
  @Public()
  @Post('/password-recovery')
  passwordRecovery(@Body() emailRecoveryDto: EmailRecoveryDto) {
    return this.mailService.passwordRecovery(emailRecoveryDto);
  }
}
