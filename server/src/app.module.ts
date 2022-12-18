import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { TeamsModule } from './api/teams/teams.module';
import { ProjectsModule } from './api/projects/projects.module';
import { TasksModule } from './api/tasks/tasks.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './api/auth/guards';
import { InvitationsModule } from './api/invitations/invitations.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { IsActiveGuard } from './api/auth/guards/is-active.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          type: 'login',
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 20,
    }),
    MailModule,
    AuthModule,
    UsersModule,
    RolesModule,
    TeamsModule,
    ProjectsModule,
    TasksModule,
    InvitationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: IsActiveGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
