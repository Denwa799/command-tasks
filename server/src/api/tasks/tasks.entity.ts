import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { Project } from 'src/api/projects/projects.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { TaskStatusType } from './tasks.type';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Найти персонал', description: 'Текст задачи' })
  @Column()
  @IsString()
  text: string;

  @ApiProperty({ type: () => User, description: 'Ответственный пользователь' })
  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  responsible: User;

  @ApiProperty({ example: 'inProgress', description: 'Статус' })
  @Column()
  @IsString()
  status: TaskStatusType;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @Column()
  @IsBoolean()
  isUrgently: boolean;

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата задачи в календаре',
  })
  @Column()
  @IsDate()
  date: Date;

  @ApiProperty({ type: () => Project, description: 'Проект задачи' })
  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;

  @ApiProperty({
    example: '2022-07-04',
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
