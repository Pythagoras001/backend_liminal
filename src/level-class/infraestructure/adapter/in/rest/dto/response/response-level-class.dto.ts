import { Expose, Transform } from 'class-transformer';
import { SurvivalClassEntity } from '../../../../../../domain/LevelClass';
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
  @Expose() description: string;

  @Expose()
  @Transform(({ obj }: { obj: SurvivalClassEntity }) => {
    const iconImage = obj.getIconImage();

    return {
      thumbnailUrl: iconImage.getThumbnailUrl(),
      mediumUrl: iconImage.getMediumUrl(),
      originalUrl: iconImage.getOriginalUrl(),
    };
  })
  iconImage: {
    thumbnailUrl: string;
    mediumUrl: string;
    originalUrl: string;
  };
}
