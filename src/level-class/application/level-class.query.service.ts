import { Injectable, NotFoundException } from '@nestjs/common';
import { SurvivalClassEntity } from '../domain/LevelClass';
import { LevelClassRepositoryAdapter } from '../infraestructure/adapter/out/persistence/level-class.repository.adapter';

@Injectable()
export class LevelClassQueryService {
  constructor(
    private readonly levelClassRepositoryAdapter: LevelClassRepositoryAdapter,
  ) {}

  async findAll(): Promise<SurvivalClassEntity[]> {
    return this.levelClassRepositoryAdapter.findAll();
  }

  async findById(id: number): Promise<SurvivalClassEntity> {
    const levelClass = await this.levelClassRepositoryAdapter.findById(id);

    if (!levelClass) {
      throw new NotFoundException(`Level class with id ${id} not found`);
    }

    return levelClass;
  }
}
