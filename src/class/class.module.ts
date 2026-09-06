import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { PrismaService } from '../prisma/prisma.service';
import { LevelClassService } from './application/level-class.service';
import { LevelClassController } from './infraestructure/adapter/in/rest/level-class.controller';
import { LevelClassRepositoryAdapter } from './infraestructure/adapter/out/persistence/level-class.repository.adapter';

@Module({
  imports: [ImageModule],
  controllers: [LevelClassController],
  providers: [LevelClassService, LevelClassRepositoryAdapter, PrismaService],
})
export class ClassModule {}
