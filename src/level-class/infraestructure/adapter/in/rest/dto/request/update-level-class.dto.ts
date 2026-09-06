import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  Legitimacy,
  SurvivalClassType,
} from '../../../../../../domain/enums/survival-class.enum';

export class UpdateLevelClassDto {
  @IsOptional()
  @IsEnum(SurvivalClassType)
  type?: SurvivalClassType;

  @IsOptional()
  @IsString()
  classNumber?: string;

  @IsOptional()
  @IsString()
  securityLevel?: string;

  @IsOptional()
  @IsEnum(Legitimacy)
  legitimacy?: Legitimacy;

  @IsOptional()
  @IsString()
  dangerLevel?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
