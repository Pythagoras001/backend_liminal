import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule, AuthModule, CloudinaryModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
