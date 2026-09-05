import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserRepositoryAdapter } from '../infraestructure/adapter/out/persistence/user.respository.adapter';
import { ResponseUserDto } from '../infraestructure/adapter/dto/response/response-user.dto';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepositoryAdapter: UserRepositoryAdapter) {}

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepositoryAdapter.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
