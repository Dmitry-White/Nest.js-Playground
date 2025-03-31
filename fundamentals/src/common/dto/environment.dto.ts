import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;
}
