import { Injectable } from '@nestjs/common';
import { LevelClassQueryService } from '../../level-class/application/level-class.query.service';
import { UserQueryService } from '../../user/application/user.query.service';
import { ReportRepositoryAdapter } from '../infraestructure/adapter/out/report.repository.adapter';
import { ReportDetailReadModel } from './read-model/report-detail.readmodel';

@Injectable()
export class ReportQueryService {
  constructor(
    private readonly reportRepositoryAdapter: ReportRepositoryAdapter,
    private readonly userQueryService: UserQueryService,
    private readonly levelClassQueryService: LevelClassQueryService,
  ) {}

  async findAll(): Promise<ReportDetailReadModel[]> {
    const reports = await this.reportRepositoryAdapter.findAll();

    return Promise.all(
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
  }
}
