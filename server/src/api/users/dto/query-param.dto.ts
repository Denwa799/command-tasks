import { IsDefined, IsString } from 'class-validator';

export class EmailQueryParamDto {
  @IsDefined()
  @IsString({ message: 'Должно быть строкой' })
  email: string;
}
