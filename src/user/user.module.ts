import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { UserService } from './application/user.service';
import { UserQueryService } from './application/user.query.service';
import { UserController } from './infraestructure/adapter/in/rest/user.controller';
import { UserRepositoryAdapter } from './infraestructure/adapter/out/persistence/user.respository.adapter';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ImageModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserQueryService,
    UserRepositoryAdapter,
    PrismaService,
  ],
  exports: [UserQueryService],
})
export class UserModule {}
