import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/User';
import { UserRepositoryAdapter } from '../infraestructure/adapter/out/persistence/user.respository.adapter';
import { UserAlreadyExistsError } from '../infraestructure/adapter/out/persistence/exception/user-already-exists.error';
import { CreateUserDto } from '../infraestructure/adapter/dto/request/create-user.dto';
import { ResponseUserDto } from '../infraestructure/adapter/dto/response/response-user.dto';
import { UpdateUserDto } from '../infraestructure/adapter/dto/request/update-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryAdapter: UserRepositoryAdapter) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );

    const user = new User(
      undefined,
      createUserDto.userName,
      createUserDto.email,
      hashedPassword,
      new Date(),
    );

    try {
      const createdUser = await this.userRepositoryAdapter.create(user);

      return plainToInstance(ResponseUserDto, createdUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepositoryAdapter.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.userName) {
      user.changeUserName(updateUserDto.userName);
    }

    if (updateUserDto.email) {
      user.changeEmail(updateUserDto.email);
    }

    try {
      const updatedUser = await this.userRepositoryAdapter.update(user);

      return plainToInstance(ResponseUserDto, updatedUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
}
