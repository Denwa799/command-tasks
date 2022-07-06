import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AuthModule)],
  exports: [RolesService],
})
export class RolesModule {}
