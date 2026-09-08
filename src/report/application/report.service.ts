import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageService } from '../../image/application/image.service';
import { LevelClassRepositoryAdapter } from '../../level-class/infraestructure/adapter/out/persistence/level-class.repository.adapter';
import { Evidence } from '../domain/Evidence';
import { Report } from '../domain/Report';
import { CreateReportDto } from '../infraestructure/adapter/in/rest/dto/request/create-report.dto';
import { UpdateReportDto } from '../infraestructure/adapter/in/rest/dto/request/update-report.dto';
import { ReportRepositoryAdapter } from '../infraestructure/adapter/out/report.repository.adapter';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepositoryAdapter: ReportRepositoryAdapter,
    private readonly imageService: ImageService,
    private readonly levelClassRepositoryAdapter: LevelClassRepositoryAdapter,
  ) {}

  async create(
    dto: CreateReportDto,
    authorId: string,
    principalEvidenceBuffer: Buffer,
    galeryEvidencesBuffers: Buffer[] = [],
  ): Promise<Report> {
    const levelClass = await this.levelClassRepositoryAdapter.findById(
      dto.levelClassId,
    );

    if (!levelClass) {
      throw new NotFoundException(
        `Level class with id ${dto.levelClassId} not found`,
      );
    }

    const galeryEvidencesDescriptions = dto.galeryEvidencesDescriptions ?? [];

    if (galeryEvidencesDescriptions.length !== galeryEvidencesBuffers.length) {
      throw new BadRequestException(
        'galeryEvidencesDescriptions and galeryEvidences must have the same length',
      );
    }

    const principalEvidenceImage = await this.imageService.upload(
      principalEvidenceBuffer,
    );

    const principalEvidence = new Evidence(
      undefined,
      principalEvidenceImage,
      dto.principalEvidenceDescription,
    );

    const galeryEvidences = await Promise.all(
      galeryEvidencesBuffers.map(async (buffer, index) => {
        const image = await this.imageService.upload(buffer);

        return new Evidence(undefined, image, galeryEvidencesDescriptions[index]);
      }),
    );

    const report = new Report(
      undefined,
      authorId,
      dto.title,
      dto.nivel,
      dto.levelClassId,
      dto.description,
      principalEvidence,
      new Date(),
      galeryEvidences,
    );

    return this.reportRepositoryAdapter.create(report);
  }

  async rate(reportId: number, userId: string, liked: boolean): Promise<Report> {
    const report = await this.reportRepositoryAdapter.findById(reportId);

    if (!report) {
      throw new NotFoundException(`Report with id ${reportId} not found`);
    }

    report.rate(userId, liked);

    return this.reportRepositoryAdapter.update(report);
  }

  async update(
    reportId: number,
    userId: string,
    dto: UpdateReportDto,
  ): Promise<Report> {
    const report = await this.reportRepositoryAdapter.findById(reportId);

    if (!report) {
      throw new NotFoundException(`Report with id ${reportId} not found`);
    }

    if (report.getAuthorId() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this report',
      );
    }

    if (dto.levelClassId !== undefined) {
      const levelClass = await this.levelClassRepositoryAdapter.findById(
        dto.levelClassId,
      );

      if (!levelClass) {
        throw new NotFoundException(
          `Level class with id ${dto.levelClassId} not found`,
        );
      }

      report.changeLevelClassId(dto.levelClassId);
    }

    if (dto.title !== undefined) {
      report.changeTitle(dto.title);
    }

    if (dto.nivel !== undefined) {
      report.changeNivel(dto.nivel);
    }

    if (dto.description !== undefined) {
      report.changeDescription(dto.description);
    }

    return this.reportRepositoryAdapter.update(report);
  }

  async delete(reportId: number, userId: string): Promise<void> {
    const report = await this.reportRepositoryAdapter.findById(reportId);

    if (!report) {
      throw new NotFoundException(`Report with id ${reportId} not found`);
    }

    if (report.getAuthorId() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this report',
      );
    }

    await this.reportRepositoryAdapter.delete(reportId);
  }
}
