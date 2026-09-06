import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from './application/image.service';
import { ImageRepositoryAdapter } from './infraestructure/adapter/out/persistence/image.respository.adapter';

@Module({
  imports: [CloudinaryModule],
  providers: [ImageService, ImageRepositoryAdapter, PrismaService],
  exports: [ImageService],
})
export class ImageModule {}
