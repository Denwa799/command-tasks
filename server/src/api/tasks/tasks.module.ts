import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { ProjectsModule } from 'src/api/projects/projects.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task]), ProjectsModule, JwtModule],
})
export class TasksModule {}
