import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class RateReportDto {
  @Type(() => Number)
  @IsInt()
  reportId: number;

  @IsBoolean()
  liked: boolean;
}
