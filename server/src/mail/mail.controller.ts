import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckEmailDto } from './dto/check-email.dto';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}

  @ApiOperation({ summary: 'Проверка работоспособности почты' })
  @ApiResponse({ status: 200, description: 'Отправлено' })
  @Get('/test')
  sendTestEmail() {
    return this.mailService.sendTestEmail();
  }

  @Post('/check')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.mailService.checkEmail(checkEmailDto);
  }
}
