import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';
import { Task } from 'src/api/tasks/tasks.entity';
import { Team } from 'src/api/teams/teams.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Гастрит', description: 'Название проекта' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ type: () => Team, description: 'Команда проекта' })
  @ManyToOne(() => Team, (team) => team.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: Team;

  @ApiProperty({ type: () => Task, description: 'Проекты команды' })
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата создания',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата обновления',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  @IsDate()
  updatedAt: Date;
}
