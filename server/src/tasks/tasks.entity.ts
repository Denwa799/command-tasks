import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { Project } from 'src/projects/projects.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

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

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО ответственного' })
  @Column()
  @IsString()
  responsible: string;

  @ApiProperty({ example: 'overdue', description: 'Статус' })
  @Column()
  @IsString()
  status: string;

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
  @IsString()
  createdAt: string;

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата обновления',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  @IsDate()
  updatedAt: Date;
}
