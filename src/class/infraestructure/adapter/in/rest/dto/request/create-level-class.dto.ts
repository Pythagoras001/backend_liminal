import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Legitimacy,
  SurvivalClassType,
} from '../../../../../../domain/enums/survival-class.enum';

export class CreateLevelClassDto {
  @IsEnum(SurvivalClassType)
  type: SurvivalClassType;

  @IsOptional()
  @IsString()
  classNumber?: string;

  @IsString()
  @IsNotEmpty()
  securityLevel: string;

  @IsEnum(Legitimacy)
  legitimacy: Legitimacy;

  @IsString()
  @IsNotEmpty()
  dangerLevel: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
