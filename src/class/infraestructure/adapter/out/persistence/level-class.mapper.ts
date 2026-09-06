import {
  Prisma,
  SurvivalClassPersist,
} from '../../../../../generated/prisma/client';
import { SurvivalClassEntity } from '../../../../domain/LevelClass';
import {
  Legitimacy,
  SurvivalClassType,
} from '../../../../domain/enums/survival-class.enum';

export class LevelClassMapper {
  static toDomain(persist: SurvivalClassPersist): SurvivalClassEntity {
    return new SurvivalClassEntity(
      persist.id,
      persist.type as SurvivalClassType,
      persist.classNumber,
      persist.securityLevel,
      persist.legitimacy as Legitimacy,
      persist.dangerLevel,
      persist.iconUrl,
      persist.description,
    );
  }

  static toPersist(
    entity: SurvivalClassEntity,
  ): Prisma.SurvivalClassPersistCreateInput {
    return {
      type: entity.getType(),
      classNumber: entity.getClassNumber(),
      securityLevel: entity.getSecurityLevel(),
      legitimacy: entity.getLegitimacy(),
      dangerLevel: entity.getDangerLevel(),
      iconUrl: entity.getIconUrl(),
      description: entity.getDescription(),
    };
  }

  static toUpdateData(
    entity: SurvivalClassEntity,
  ): Prisma.SurvivalClassPersistUpdateInput {
    return {
      type: entity.getType(),
      classNumber: entity.getClassNumber(),
      securityLevel: entity.getSecurityLevel(),
      legitimacy: entity.getLegitimacy(),
      dangerLevel: entity.getDangerLevel(),
      iconUrl: entity.getIconUrl(),
      description: entity.getDescription(),
    };
  }
}
