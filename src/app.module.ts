import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { ClassModule } from './level-class/class.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CloudinaryModule,
    ImageModule,
    ClassModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
