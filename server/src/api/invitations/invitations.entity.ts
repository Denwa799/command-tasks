import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../teams/teams.entity';
import { User } from '../users/users.entity';

@Entity('invitations')
export class Invitation {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'Приглашение в команду Сочинение от test@test.ru',
    description: 'Текст сообщения',
  })
  @Column()
  @IsString()
  message: string;

  @ApiProperty({ type: () => Team, description: 'Команда приглашения' })
  @ManyToOne(() => Team, (team) => team.invitations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: Team;

  @ApiProperty({ type: () => User, description: 'Приглашаемый пользователь' })
  @ManyToOne(() => User, (user) => user.invitations)
  @JoinColumn()
  user: User;

  @ApiProperty({
    example: 'true',
    description: 'Принято приглашение или нет',
  })
  @Column()
  @IsBoolean()
  isAccepted: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Прочитано приглашение или нет',
  })
  @Column()
  @IsBoolean()
  isRead: boolean;

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
