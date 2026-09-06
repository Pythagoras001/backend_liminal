import { v2 as CloudinaryType } from 'cloudinary';

export interface ImageVariantUrls {
  thumbnailUrl: string;
  mediumUrl: string;
}

export function buildImageVariantUrls(
  cloudinary: typeof CloudinaryType,
  publicId: string,
): ImageVariantUrls {
  return {
    thumbnailUrl: cloudinary.url(publicId, {
      secure: true,
      transformation: [{ width: 150, height: 150, crop: 'fill' }],
    }),
    mediumUrl: cloudinary.url(publicId, {
      secure: true,
      transformation: [{ width: 600, crop: 'scale' }],
    }),
  };
}
