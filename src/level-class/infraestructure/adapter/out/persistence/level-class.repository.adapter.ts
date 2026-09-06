import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { SurvivalClassEntity } from '../../../../domain/LevelClass';
import { LevelClassMapper } from './level-class.mapper';

@Injectable()
export class LevelClassRepositoryAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: SurvivalClassEntity): Promise<SurvivalClassEntity> {
    const persist = await this.prisma.survivalClassPersist.create({
      data: LevelClassMapper.toPersist(entity),
      include: { iconImage: true },
    });

    return LevelClassMapper.toDomain(persist);
  }

  async findById(id: number): Promise<SurvivalClassEntity | null> {
    const persist = await this.prisma.survivalClassPersist.findUnique({
      where: { id },
      include: { iconImage: true },
    });

    if (!persist) {
      return null;
    }

    return LevelClassMapper.toDomain(persist);
  }

  async update(entity: SurvivalClassEntity): Promise<SurvivalClassEntity> {
    const id = entity.getId();

    if (!id) {
      throw new Error('Cannot update a survival class without an id');
    }

    const persist = await this.prisma.survivalClassPersist.update({
      where: { id },
      data: LevelClassMapper.toUpdateData(entity),
      include: { iconImage: true },
    });

    return LevelClassMapper.toDomain(persist);
  }
}
