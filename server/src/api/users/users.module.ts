import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/api/auth/auth.module';
import { RolesModule } from 'src/api/roles/roles.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    RolesModule,
    JwtModule,
    forwardRef(() => MailModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
