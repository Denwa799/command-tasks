import { IsOptional } from 'class-validator';

export class PaginationQueryParamDto {
  @IsOptional()
  take: number;

  @IsOptional()
  skip: number;
}
