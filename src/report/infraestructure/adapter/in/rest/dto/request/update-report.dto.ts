import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nivel?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  levelClassId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
