import { ImagePersist, Prisma } from '../../../../../generated/prisma/client';
import { Image } from '../../../../domain/Image';

export class ImageMapper {
  static toDomain(imagePersist: ImagePersist): Image {
    return new Image(
      imagePersist.id,
      imagePersist.publicId,
      imagePersist.originalUrl,
      imagePersist.thumbnailUrl,
      imagePersist.mediumUrl,
      imagePersist.createdAt,
    );
  }

  static toPersist(image: Image): Prisma.ImagePersistCreateInput {
    return {
      id: image.getId(),
      publicId: image.getPublicId(),
      originalUrl: image.getOriginalUrl(),
      thumbnailUrl: image.getThumbnailUrl(),
      mediumUrl: image.getMediumUrl(),
      createdAt: image.getCreatedAt(),
    };
  }
}
