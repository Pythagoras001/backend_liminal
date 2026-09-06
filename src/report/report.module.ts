import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { PrismaService } from '../prisma/prisma.service';
import { ReportService } from './application/report.service';
import { ReportController } from './infraestructure/adapter/in/rest/report.controller';
import { ReportRepositoryAdapter } from './infraestructure/adapter/out/report.repository.adapter';

@Module({
  imports: [ImageModule],
  controllers: [ReportController],
  providers: [ReportService, ReportRepositoryAdapter, PrismaService],
})
export class ReportModule {}
