import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ReportService } from '../../../../application/report.service';
import { CurrentUser } from '../../../../../auth/infraestructure/adapter/in/rest/decorator/current-user.decorator';
import type { JwtPayload } from '../../../../../auth/infraestructure/security/jwt-payload.interface';
import { CreateReportDto } from './dto/request/create-report.dto';
import { ResponseReportDto } from './dto/response/response-report.dto';

type CreateReportFiles = {
  principalEvidence?: Express.Multer.File[];
  galeryEvidences?: Express.Multer.File[];
};

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'principalEvidence', maxCount: 1 },
      { name: 'galeryEvidences' },
    ]),
  )
  async create(
    @CurrentUser() currentUser: JwtPayload,
    @Body() createReportDto: CreateReportDto,
    @UploadedFiles() files: CreateReportFiles,
  ): Promise<ResponseReportDto> {
    const [principalEvidence] = files.principalEvidence ?? [];

    if (!principalEvidence) {
      throw new BadRequestException('principalEvidence is required');
    }

    const galeryEvidences = files.galeryEvidences ?? [];

    const report = await this.reportService.create(
      createReportDto,
      currentUser.sub,
      principalEvidence.buffer,
      galeryEvidences.map((file) => file.buffer),
    );

    return plainToInstance(ResponseReportDto, report, {
      excludeExtraneousValues: true,
    });
  }
}
