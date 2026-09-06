import { UploadApiResponse, v2 as CloudinaryType } from 'cloudinary';
import { Readable } from 'stream';

export function uploadBufferToCloudinary(
  cloudinary: typeof CloudinaryType,
  buffer: Buffer,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload returned no result'));
          return;
        }

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}
