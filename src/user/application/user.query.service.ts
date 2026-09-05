import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/User';
import { UserRepositoryAdapter } from '../infraestructure/adapter/out/persistence/user.respository.adapter';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepositoryAdapter: UserRepositoryAdapter) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepositoryAdapter.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepositoryAdapter.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

}
