import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/api/users/users.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [forwardRef(() => UsersModule)],
  exports: [MailService],
})
export class MailModule {}
