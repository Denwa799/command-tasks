import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'admin', description: 'Уникальное значение роли' })
  @Column({ unique: true })
  @IsString()
  @Length(3, 15)
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ unique: true })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Пользователи с этой ролью' })
  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
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
