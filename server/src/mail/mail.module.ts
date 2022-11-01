import { Module } from '@nestjs/common';
import { UsersModule } from 'src/api/users/users.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [UsersModule],
  exports: [MailService],
})
export class MailModule {}
