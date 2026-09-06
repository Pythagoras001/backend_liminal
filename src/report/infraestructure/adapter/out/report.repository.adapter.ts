import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Report } from '../../../domain/Report';
import { ReportMapper } from './report.mapper';

const reportInclude = {
  principalEvidence: { include: { image: true } },
  galeryEvidences: { include: { image: true } },
  likes: true,
} as const;

@Injectable()
export class ReportRepositoryAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Report): Promise<Report> {
    const persist = await this.prisma.reportPersist.create({
      data: ReportMapper.toPersist(entity),
      include: reportInclude,
    });

    return ReportMapper.toDomain(persist);
  }

  async findAll(): Promise<Report[]> {
    const persists = await this.prisma.reportPersist.findMany({
      include: reportInclude,
    });

    return persists.map((persist) => ReportMapper.toDomain(persist));
  }
}
