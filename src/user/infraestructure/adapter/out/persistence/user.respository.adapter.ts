import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../../generated/prisma/client';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { User } from '../../../../domain/User';
import { UserMapper } from './user.mapper';
import { UserAlreadyExistsError } from './exception/user-already-exists.error';

@Injectable()
export class UserRepositoryAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      const userPersist = await this.prisma.userPersist.create({
        data: UserMapper.toPersist(user),
      });

      return UserMapper.toDomain(userPersist);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UserAlreadyExistsError('userName or email already in use');
      }

      throw error;
    }
  }

  async findOne(id: string): Promise<User | null> {
    const userPersist = await this.prisma.userPersist.findUnique({
      where: { id },
    });

    if (!userPersist) {
      return null;
    }

    return UserMapper.toDomain(userPersist);
  }
}
