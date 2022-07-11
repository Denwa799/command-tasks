import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [TypeOrmModule.forFeature([Project]), TeamsModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
