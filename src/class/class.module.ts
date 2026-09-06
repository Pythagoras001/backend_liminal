import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LevelClassService } from './application/level-class.service';
import { LevelClassController } from './infraestructure/adapter/in/rest/level-class.controller';
import { LevelClassRepositoryAdapter } from './infraestructure/adapter/out/persistence/level-class.repository.adapter';

@Module({
  controllers: [LevelClassController],
  providers: [LevelClassService, LevelClassRepositoryAdapter, PrismaService],
})
export class ClassModule {}
