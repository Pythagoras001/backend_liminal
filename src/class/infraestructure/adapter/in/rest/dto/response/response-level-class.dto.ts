import { Expose } from 'class-transformer';
import {
  Legitimacy,
  SurvivalClassType,
} from '../../../../../../domain/enums/survival-class.enum';

export class ResponseLevelClassDto {
  @Expose() id: number;
  @Expose() type: SurvivalClassType;
  @Expose() classNumber: string | null;
  @Expose() securityLevel: string;
  @Expose() legitimacy: Legitimacy;
  @Expose() dangerLevel: string;
  @Expose() iconUrl: string;
  @Expose() description: string;
}
