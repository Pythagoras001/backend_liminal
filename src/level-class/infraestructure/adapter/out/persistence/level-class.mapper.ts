import {
  ImagePersist,
  Prisma,
  SurvivalClassPersist,
} from '../../../../../generated/prisma/client';
import { ImageMapper } from '../../../../../image/infraestructure/adapter/out/persistence/image.mapper';
import { SurvivalClassEntity } from '../../../../domain/LevelClass';
import {
  Legitimacy,
  SurvivalClassType,
} from '../../../../domain/enums/survival-class.enum';

type SurvivalClassPersistWithIconImage = SurvivalClassPersist & {
  iconImage: ImagePersist;
};

export class LevelClassMapper {
  static toDomain(
    persist: SurvivalClassPersistWithIconImage,
  ): SurvivalClassEntity {
    return new SurvivalClassEntity(
      persist.id,
      persist.type as SurvivalClassType,
      persist.classNumber,
      persist.securityLevel,
      persist.legitimacy as Legitimacy,
      persist.dangerLevel,
      ImageMapper.toDomain(persist.iconImage),
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
      iconImage: { connect: { id: entity.getIconImage().getId() } },
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
      iconImage: { connect: { id: entity.getIconImage().getId() } },
      description: entity.getDescription(),
    };
  }
}
