import { IsArray, IsNumber, IsString } from 'class-validator';

export class FetchResponseError {
  @IsNumber()
  statusCode!: number;

  @IsString()
  error!: string;

  @IsString({ each: true })
  @IsArray()
  message!: string[] | string;
}
