import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ReportService } from '../../../../application/report.service';
import { ReportQueryService } from '../../../../application/report.query.service';
import { CurrentUser } from '../../../../../auth/infraestructure/adapter/in/rest/decorator/current-user.decorator';
import type { JwtPayload } from '../../../../../auth/infraestructure/security/jwt-payload.interface';
import { CreateReportDto } from './dto/request/create-report.dto';
import { RateReportDto } from './dto/request/rate-report.dto';
import { UpdateReportDto } from './dto/request/update-report.dto';
import { FindAllReportsQueryDto } from './dto/request/find-all-reports.query.dto';
import { ResponseReportDto } from './dto/response/response-report.dto';
import { ResponseReportDetailDto } from './dto/response/response-report-detail.dto';
import type { PaginatedResponseDto } from './dto/response/paginated-response.dto';
import { Public } from '../../../../../auth/infraestructure/adapter/in/rest/decorator/public-access.decorator';

type CreateReportFiles = {
  principalEvidence?: Express.Multer.File[];
  galeryEvidences?: Express.Multer.File[];
};

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly reportQueryService: ReportQueryService,
  ) {}

  @Public()
  @Get()
  async findAll(
    @Query() query: FindAllReportsQueryDto,
  ): Promise<PaginatedResponseDto<ResponseReportDetailDto>> {
    const result = await this.reportQueryService.findAll(query.page);

    return {
      data: plainToInstance(ResponseReportDetailDto, result.data, {
        excludeExtraneousValues: true,
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };
  }

  @Get('me')
  async findByAuthor(
    @CurrentUser() currentUser: JwtPayload,
    @Query() query: FindAllReportsQueryDto,
  ): Promise<PaginatedResponseDto<ResponseReportDetailDto>> {
    const result = await this.reportQueryService.findByAuthor(
      currentUser.sub,
      query.page,
    );

    return {
      data: plainToInstance(ResponseReportDetailDto, result.data, {
        excludeExtraneousValues: true,
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };
  }

  @Public()
  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReportDetailDto> {
    const report = await this.reportQueryService.findById(id);

    return plainToInstance(ResponseReportDetailDto, report, {
      excludeExtraneousValues: true,
    });
  }

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

  @Patch()
  async rate(
    @CurrentUser() currentUser: JwtPayload,
    @Body() rateReportDto: RateReportDto,
  ): Promise<ResponseReportDto> {
    const report = await this.reportService.rate(
      rateReportDto.reportId,
      currentUser.sub,
      rateReportDto.liked,
    );

    return plainToInstance(ResponseReportDto, report, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @CurrentUser() currentUser: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ResponseReportDto> {
    const report = await this.reportService.update(
      id,
      currentUser.sub,
      updateReportDto,
    );

    return plainToInstance(ResponseReportDto, report, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @CurrentUser() currentUser: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.reportService.delete(id, currentUser.sub);
  }
}
