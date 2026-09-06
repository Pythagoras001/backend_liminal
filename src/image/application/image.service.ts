import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v2 as CloudinaryType } from 'cloudinary';
import { CLOUDINARY } from '../../cloudinary/cloudinary.provider';
import { uploadBufferToCloudinary } from '../../cloudinary/cloudinary-upload.helper';
import { buildImageVariantUrls } from '../../cloudinary/cloudinary-url.builder';
import { Image } from '../domain/Image';
import { ImageRepositoryAdapter } from '../infraestructure/adapter/out/persistence/image.respository.adapter';

@Injectable()
export class ImageService {
  constructor(
    @Inject(CLOUDINARY) private readonly cloudinary: typeof CloudinaryType,
    private readonly imageRepositoryAdapter: ImageRepositoryAdapter,
  ) {}

  async upload(fileBuffer: Buffer): Promise<Image> {
    const uploadResult = await uploadBufferToCloudinary(
      this.cloudinary,
      fileBuffer,
    );

    const { thumbnailUrl, mediumUrl } = buildImageVariantUrls(
      this.cloudinary,
      uploadResult.public_id,
    );

    const image = new Image(
      undefined,
      uploadResult.public_id,
      uploadResult.secure_url,
      thumbnailUrl,
      mediumUrl,
      new Date(),
    );

    return this.imageRepositoryAdapter.create(image);
  }

  async delete(id: string): Promise<void> {
    const image = await this.imageRepositoryAdapter.findById(id);

    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    await this.cloudinary.uploader.destroy(image.getPublicId());
    await this.imageRepositoryAdapter.delete(id);
  }
}
