import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { ClassModule } from '../level-class/class.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { ReportService } from './application/report.service';
import { ReportQueryService } from './application/report.query.service';
import { ReportController } from './infraestructure/adapter/in/rest/report.controller';
import { ReportRepositoryAdapter } from './infraestructure/adapter/out/report.repository.adapter';

@Module({
  imports: [ImageModule, ClassModule, UserModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    ReportQueryService,
    ReportRepositoryAdapter,
    PrismaService,
  ],
})
export class ReportModule {}
