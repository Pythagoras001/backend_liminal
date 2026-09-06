import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageService } from '../../image/application/image.service';
import { Evidence } from '../domain/Evidence';
import { Report } from '../domain/Report';
import { CreateReportDto } from '../infraestructure/adapter/in/rest/dto/request/create-report.dto';
import { ReportRepositoryAdapter } from '../infraestructure/adapter/out/report.repository.adapter';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepositoryAdapter: ReportRepositoryAdapter,
    private readonly imageService: ImageService,
  ) {}

  async create(
    dto: CreateReportDto,
    authorId: string,
    principalEvidenceBuffer: Buffer,
    galeryEvidencesBuffers: Buffer[] = [],
  ): Promise<Report> {
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
}
