import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/api/auth/decorators';
import { CheckEmailDto } from './dto/check-email.dto';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}

  @ApiOperation({ summary: 'Отправка письма с кодом подтверждения' })
  @ApiResponse({ status: 200, description: 'Письмо отправлено' })
  @Public()
  @Post('/check')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.mailService.checkEmail(checkEmailDto);
  }
}
