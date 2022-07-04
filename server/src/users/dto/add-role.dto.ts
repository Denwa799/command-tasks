import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
  readonly value: string;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  readonly userId: number;
}
