import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [UserModule, AuthModule, CloudinaryModule, ImageModule, ClassModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
