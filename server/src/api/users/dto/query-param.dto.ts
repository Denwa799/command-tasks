import { IsDefined, IsOptional, IsString } from 'class-validator';

export class EmailQueryParamDto {
  @IsDefined()
  @IsString({ message: 'Должно быть строкой' })
  email: string;

  @IsOptional()
  take: number;

  @IsOptional()
  skip: number;
}

export class PaginationQueryParamDto {
  @IsOptional()
  take: number;

  @IsOptional()
  skip: number;
}
