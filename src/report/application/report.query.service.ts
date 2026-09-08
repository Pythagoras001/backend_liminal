import { Injectable, NotFoundException } from '@nestjs/common';
import { LevelClassQueryService } from '../../level-class/application/level-class.query.service';
import { UserQueryService } from '../../user/application/user.query.service';
import { ReportRepositoryAdapter } from '../infraestructure/adapter/out/report.repository.adapter';
import { PaginatedResult } from './read-model/paginated-result';
import { ReportDetailReadModel } from './read-model/report-detail.readmodel';

const REPORTS_PAGE_SIZE = 9;

@Injectable()
export class ReportQueryService {
  constructor(
    private readonly reportRepositoryAdapter: ReportRepositoryAdapter,
    private readonly userQueryService: UserQueryService,
    private readonly levelClassQueryService: LevelClassQueryService,
  ) {}

  async findAll(page = 1): Promise<PaginatedResult<ReportDetailReadModel>> {
    const currentPage = page < 1 ? 1 : page;
    const skip = (currentPage - 1) * REPORTS_PAGE_SIZE;

    const [reports, total] = await Promise.all([
      this.reportRepositoryAdapter.findAll(skip, REPORTS_PAGE_SIZE),
      this.reportRepositoryAdapter.count(),
    ]);

    const data = await Promise.all(
      reports.map(async (report) => {
        const [author, levelClass] = await Promise.all([
          this.userQueryService.findById(report.getAuthorId()),
          this.levelClassQueryService.findById(report.getLevelClassId()),
        ]);

        return new ReportDetailReadModel(
          report.getId(),
          report.getTitle(),
          report.getNivel(),
          report.getDescription(),
          report.getCreatedAt(),
          report.getPrincipalEvidence(),
          report.getGaleryEvidences(),
          report.getLikesCount(),
          author,
          levelClass,
        );
      }),
    );

    return {
      data,
      page: currentPage,
      pageSize: REPORTS_PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / REPORTS_PAGE_SIZE),
    };
  }

  async findByAuthor(
    authorId: string,
    page = 1,
  ): Promise<PaginatedResult<ReportDetailReadModel>> {
    const currentPage = page < 1 ? 1 : page;
    const skip = (currentPage - 1) * REPORTS_PAGE_SIZE;

    const [reports, total] = await Promise.all([
      this.reportRepositoryAdapter.findByAuthor(
        authorId,
        skip,
        REPORTS_PAGE_SIZE,
      ),
      this.reportRepositoryAdapter.countByAuthor(authorId),
    ]);

    const data = await Promise.all(
      reports.map(async (report) => {
        const [author, levelClass] = await Promise.all([
          this.userQueryService.findById(report.getAuthorId()),
          this.levelClassQueryService.findById(report.getLevelClassId()),
        ]);

        return new ReportDetailReadModel(
          report.getId(),
          report.getTitle(),
          report.getNivel(),
          report.getDescription(),
          report.getCreatedAt(),
          report.getPrincipalEvidence(),
          report.getGaleryEvidences(),
          report.getLikesCount(),
          author,
          levelClass,
        );
      }),
    );

    return {
      data,
      page: currentPage,
      pageSize: REPORTS_PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / REPORTS_PAGE_SIZE),
    };
  }

  async findById(id: number): Promise<ReportDetailReadModel> {
    const report = await this.reportRepositoryAdapter.findById(id);

    if (!report) {
      throw new NotFoundException(`Report with id ${id} not found`);
    }

    const [author, levelClass] = await Promise.all([
      this.userQueryService.findById(report.getAuthorId()),
      this.levelClassQueryService.findById(report.getLevelClassId()),
    ]);

    return new ReportDetailReadModel(
      report.getId(),
      report.getTitle(),
      report.getNivel(),
      report.getDescription(),
      report.getCreatedAt(),
      report.getPrincipalEvidence(),
      report.getGaleryEvidences(),
      report.getLikesCount(),
      author,
      levelClass,
    );
  }
}
