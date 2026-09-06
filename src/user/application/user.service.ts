import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ImageService } from '../../image/application/image.service';
import { User } from '../domain/User';
import { UserRepositoryAdapter } from '../infraestructure/adapter/out/persistence/user.respository.adapter';
import { UserAlreadyExistsError } from '../infraestructure/adapter/out/persistence/exception/user-already-exists.error';
import { CreateUserDto } from '../infraestructure/adapter/dto/request/create-user.dto';
import { UpdateUserDto } from '../infraestructure/adapter/dto/request/update-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoryAdapter: UserRepositoryAdapter,
    private readonly imageService: ImageService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
      return await this.userRepositoryAdapter.create(user);
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
    avatarBuffer?: Buffer,
  ): Promise<User> {
    const user = await this.userRepositoryAdapter.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.userName) {
      user.changeUserName(updateUserDto.userName);
    }

    if (updateUserDto.email) {
      user.changeEmail(updateUserDto.email);
    }

    if (avatarBuffer) {
      const previousProfileImage = user.getProfileImage();
      const profileImage = await this.imageService.upload(avatarBuffer);
      user.changeProfileImage(profileImage);

      if (previousProfileImage) {
        await this.imageService.delete(previousProfileImage.getId()!);
      }
    }

    try {
      return await this.userRepositoryAdapter.update(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
}
