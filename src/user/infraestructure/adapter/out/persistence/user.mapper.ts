import {
  ImagePersist,
  Prisma,
  UserPersist,
} from '../../../../../generated/prisma/client';
import { ImageMapper } from '../../../../../image/infraestructure/adapter/out/persistence/image.mapper';
import { User } from '../../../../domain/User';

type UserPersistWithProfileImage = UserPersist & {
  profileImage: ImagePersist | null;
};

export class UserMapper {
  static toDomain(userPersist: UserPersistWithProfileImage): User {
    return new User(
      userPersist.id,
      userPersist.userName,
      userPersist.email,
      userPersist.password,
      userPersist.createdAt,
      userPersist.profileImage
        ? ImageMapper.toDomain(userPersist.profileImage)
        : undefined,
    );
  }

  static toPersist(user: User): Prisma.UserPersistCreateInput {
    const profileImageId = user.getProfileImage()?.getId();

    return {
      id: user.getId(),
      userName: user.getUserName(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      ...(profileImageId && {
        profileImage: { connect: { id: profileImageId } },
      }),
    };
  }

  static toUpdateData(user: User): Prisma.UserPersistUpdateInput {
    const profileImageId = user.getProfileImage()?.getId();

    return {
      userName: user.getUserName(),
      email: user.getEmail(),
      ...(profileImageId && {
        profileImage: { connect: { id: profileImageId } },
      }),
    };
  }
}
