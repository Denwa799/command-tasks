import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иванов Иван', description: 'ФИО' })
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

  @ApiProperty({ description: 'Роли пользователя' })
  @ManyToMany((type) => Role, (role) => role.users)
  roles: Role[];

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата создания',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    example: '2022-07-04 14:31:42.45068+03',
    description: 'Дата обновления',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
