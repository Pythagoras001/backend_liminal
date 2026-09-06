import { Injectable, NotFoundException } from '@nestjs/common';
import { SurvivalClassEntity } from '../domain/LevelClass';
import { CreateLevelClassDto } from '../infraestructure/adapter/in/rest/dto/request/create-level-class.dto';
import { UpdateLevelClassDto } from '../infraestructure/adapter/in/rest/dto/request/update-level-class.dto';
import { LevelClassRepositoryAdapter } from '../infraestructure/adapter/out/persistence/level-class.repository.adapter';

@Injectable()
export class LevelClassService {
  constructor(
    private readonly levelClassRepositoryAdapter: LevelClassRepositoryAdapter,
  ) {}

  async create(dto: CreateLevelClassDto): Promise<SurvivalClassEntity> {
    const entity = new SurvivalClassEntity(
      undefined,
      dto.type,
      dto.classNumber ?? null,
      dto.securityLevel,
      dto.legitimacy,
      dto.dangerLevel,
      dto.iconUrl,
      dto.description,
    );

    return this.levelClassRepositoryAdapter.create(entity);
  }

  async update(
    id: number,
    dto: UpdateLevelClassDto,
  ): Promise<SurvivalClassEntity> {
    const entity = await this.levelClassRepositoryAdapter.findById(id);

    if (!entity) {
      throw new NotFoundException(`Level class with id ${id} not found`);
    }

    if (dto.type) {
      entity.changeType(dto.type);
    }

    if (dto.classNumber) {
      entity.changeClassNumber(dto.classNumber);
    }

    if (dto.securityLevel) {
      entity.changeSecurityLevel(dto.securityLevel);
    }

    if (dto.legitimacy) {
      entity.changeLegitimacy(dto.legitimacy);
    }

    if (dto.dangerLevel) {
      entity.changeDangerLevel(dto.dangerLevel);
    }

    if (dto.iconUrl) {
      entity.changeIconUrl(dto.iconUrl);
    }

    if (dto.description) {
      entity.changeDescription(dto.description);
    }

    return this.levelClassRepositoryAdapter.update(entity);
  }
}
