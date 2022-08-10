import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Project } from 'src/api/projects/projects.entity';
import { User } from '../users/users.entity';

@Entity('teams')
export class Team {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Сочинение', description: 'Название команды' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ type: () => Project, description: 'Проекты команды' })
  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];

  @ApiProperty({ type: () => User, description: 'Создатель команды' })
  @ManyToOne(() => User, (user) => user.createdTeams)
  @JoinColumn()
  creator: User;

  @ApiProperty({ description: 'Пользователи в команде' })
  @ManyToMany(() => User, (user) => user.teams)
  users: User[];

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
