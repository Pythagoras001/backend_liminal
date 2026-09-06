import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  nivel: string;

  @Type(() => Number)
  @IsInt()
  levelClassId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  principalEvidenceDescription: string;

  @IsOptional()
  @Transform(({ value }: { value: string | string[] | undefined }) =>
    value === undefined || Array.isArray(value) ? value : [value],
  )
  @IsArray()
  @IsString({ each: true })
  galeryEvidencesDescriptions?: string[];
}
