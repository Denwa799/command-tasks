import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { InvitationsController } from './invitations.controller';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService],
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    UsersModule,
    JwtModule,
    forwardRef(() => TeamsModule),
  ],
  exports: [InvitationsService],
})
export class InvitationsModule {}
