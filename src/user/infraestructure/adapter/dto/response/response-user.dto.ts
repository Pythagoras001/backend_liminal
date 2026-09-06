import { Expose, Transform } from 'class-transformer';
import { User } from '../../../../domain/User';

export class ResponseUserDto {
  @Expose() id: string;
  @Expose() userName: string;
  @Expose() email: string;
  @Expose() createdAt: Date;

  @Expose()
  @Transform(({ obj }: { obj: User }) => {
    const profileImage = obj.getProfileImage();

    if (!profileImage) {
      return undefined;
    }

    return {
      thumbnailUrl: profileImage.getThumbnailUrl(),
      mediumUrl: profileImage.getMediumUrl(),
      originalUrl: profileImage.getOriginalUrl(),
    };
  })
  profileImage?: {
    thumbnailUrl: string;
    mediumUrl: string;
    originalUrl: string;
  };
}
