import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { Image } from '../../../../domain/Image';
import { ImageMapper } from './image.mapper';

@Injectable()
export class ImageRepositoryAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async create(image: Image): Promise<Image> {
    const imagePersist = await this.prisma.imagePersist.create({
      data: ImageMapper.toPersist(image),
    });

    return ImageMapper.toDomain(imagePersist);
  }

  async findById(id: string): Promise<Image | null> {
    const imagePersist = await this.prisma.imagePersist.findUnique({
      where: { id },
    });

    if (!imagePersist) {
      return null;
    }

    return ImageMapper.toDomain(imagePersist);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.imagePersist.delete({ where: { id } });
  }
}
