import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Фомин Никита', description: 'ФИО' })
  @Column()
  name: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123Abc', description: 'Пароль' })
  @Column()
  password: string;

  @ApiProperty({ example: 'true', description: 'Забанен или нет' })
  @Column({ default: false })
  banned: string;

  @ApiProperty({
    example: 'За плохое поведение',
    description: 'Причина блокировки',
  })
  @Column({ nullable: true })
  banReason: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
