import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConstants } from './constants.js';

export const CLOUDINARY = 'CLOUDINARY';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  useFactory: () => {
    cloudinary.config({
      cloud_name: cloudinaryConstants.cloudName,
      api_key: cloudinaryConstants.apiKey,
      api_secret: cloudinaryConstants.apiSecret,
    });

    return cloudinary;
  },
};
