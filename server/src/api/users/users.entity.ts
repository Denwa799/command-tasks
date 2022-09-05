import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/api/roles/roles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Invitation } from '../invitations/invitations.entity';
import { Task } from '../tasks/tasks.entity';
import { Team } from '../teams/teams.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '$2a$05$0dUvdl56Pwh.',
    description: 'Hashed refresh token',
  })
  @Column({ nullable: true })
  @IsString()
  hashedRt: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Abc', description: 'Пароль' })
  @Column()
  @IsString()
  @Length(5, 20)
  password: string;

  @ApiProperty({ example: 'true', description: 'Забанен или нет' })
  @Column({ default: false })
  @IsBoolean()
  banned: boolean;

  @ApiProperty({
    example: 'За плохое поведение',
    description: 'Причина блокировки',
  })
  @Column({ nullable: true })
  @IsString()
  banReason: string;

  @ApiProperty({ description: 'Роли пользователя' })
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @ApiProperty({
    type: () => Team,
    description: 'Созданные пользователем команды',
  })
  @OneToMany(() => Team, (team) => team.creator)
  createdTeams: Team[];

  @ApiProperty({ description: 'Команды пользователя' })
  @ManyToMany(() => Team, (team) => team.users)
  @JoinTable()
  teams: Team[];

  @ApiProperty({
    type: () => Invitation,
    description: 'Приглашения пользователя',
  })
  @OneToMany(() => Invitation, (invitation) => invitation.team, {
    onDelete: 'CASCADE',
  })
  invitations: Invitation[];

  @ApiProperty({
    type: () => Task,
    description: 'Задачи пользователя',
  })
  @OneToMany(() => Task, (task) => task.responsible, {
    onDelete: 'CASCADE',
  })
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
