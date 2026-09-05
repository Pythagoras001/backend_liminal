import { Prisma, UserPersist } from '../../../../../generated/prisma/client';
import { User } from '../../../../domain/User';

export class UserMapper {
  static toDomain(userPersist: UserPersist): User {
    return new User(
      userPersist.id,
      userPersist.userName,
      userPersist.email,
      userPersist.password,
      userPersist.createdAt,
    );
  }

  static toPersist(user: User): Prisma.UserPersistCreateInput {
    return {
      id: user.getId(),
      userName: user.getUserName(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
    };
  }
}
