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

  async findAll(skip: number, take: number): Promise<Report[]> {
    const persists = await this.prisma.reportPersist.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: reportInclude,
    });

    return persists.map((persist) => ReportMapper.toDomain(persist));
  }

  async findById(id: number): Promise<Report | null> {
    const persist = await this.prisma.reportPersist.findUnique({
      where: { id },
      include: reportInclude,
    });

    return persist ? ReportMapper.toDomain(persist) : null;
  }

  async findByAuthor(
    authorId: string,
    skip: number,
    take: number,
  ): Promise<Report[]> {
    const persists = await this.prisma.reportPersist.findMany({
      where: { authorId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: reportInclude,
    });

    return persists.map((persist) => ReportMapper.toDomain(persist));
  }

  async count(): Promise<number> {
    return this.prisma.reportPersist.count();
  }

  async countByAuthor(authorId: string): Promise<number> {
    return this.prisma.reportPersist.count({ where: { authorId } });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.reportPersist.delete({ where: { id } });
  }

  async update(entity: Report): Promise<Report> {
    const id = entity.getId()!;

    const existingLikes = await this.prisma.reportLikePersist.findMany({
      where: { reportId: id },
    });
    const currentLikes = entity.getLikes();

    const existingUserIds = new Set(existingLikes.map((like) => like.userId));
    const currentUserIds = new Set(currentLikes.map((like) => like.getUserId()));

    const likesToCreate = currentLikes.filter(
      (like) => !existingUserIds.has(like.getUserId()),
    );
    const userIdsToDelete = existingLikes
      .filter((like) => !currentUserIds.has(like.userId))
      .map((like) => like.userId);

    const persist = await this.prisma.reportPersist.update({
      where: { id },
      data: {
        title: entity.getTitle(),
        nivel: entity.getNivel(),
        description: entity.getDescription(),
        levelClass: { connect: { id: entity.getLevelClassId() } },
        likes: {
          create: likesToCreate.map((like) => ({
            userId: like.getUserId(),
            createdAt: like.getCreatedAt(),
          })),
          deleteMany: userIdsToDelete.length
            ? [{ userId: { in: userIdsToDelete } }]
            : undefined,
        },
      },
      include: reportInclude,
    });

    return ReportMapper.toDomain(persist);
  }
}
