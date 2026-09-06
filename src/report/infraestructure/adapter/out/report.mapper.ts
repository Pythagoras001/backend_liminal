import {
  EvidencePersist,
  ImagePersist,
  Prisma,
  ReportLikePersist,
  ReportPersist,
} from '../../../../generated/prisma/client';
import { ImageMapper } from '../../../../image/infraestructure/adapter/out/persistence/image.mapper';
import { Evidence } from '../../../domain/Evidence';
import { Report } from '../../../domain/Report';
import { ReportLike } from '../../../domain/ReportLike';

type EvidencePersistWithImage = EvidencePersist & { image: ImagePersist };

export type ReportPersistWithRelations = ReportPersist & {
  principalEvidence: EvidencePersistWithImage;
  galeryEvidences: EvidencePersistWithImage[];
  likes: ReportLikePersist[];
};

export class ReportMapper {
  static toDomain(persist: ReportPersistWithRelations): Report {
    return new Report(
      persist.id,
      persist.authorId,
      persist.title,
      persist.nivel,
      persist.levelClassId,
      persist.description,
      this.evidenceToDomain(persist.principalEvidence),
      persist.createdAt,
      persist.galeryEvidences.map((evidence) => this.evidenceToDomain(evidence)),
      persist.likes.map((like) => this.likeToDomain(like)),
    );
  }

  static toPersist(report: Report): Prisma.ReportPersistCreateInput {
    return {
      title: report.getTitle(),
      nivel: report.getNivel(),
      description: report.getDescription(),
      createdAt: report.getCreatedAt(),
      author: { connect: { id: report.getAuthorId() } },
      levelClass: { connect: { id: report.getLevelClassId() } },
      principalEvidence: {
        create: this.evidenceToCreateInput(report.getPrincipalEvidence()),
      },
      galeryEvidences: {
        create: report
          .getGaleryEvidences()
          .map((evidence) => this.evidenceToCreateInput(evidence)),
      },
    };
  }

  private static evidenceToDomain(persist: EvidencePersistWithImage): Evidence {
    return new Evidence(
      persist.id,
      ImageMapper.toDomain(persist.image),
      persist.description,
    );
  }

  private static evidenceToCreateInput(
    evidence: Evidence,
  ): Prisma.EvidencePersistCreateWithoutGaleryReportInput {
    return {
      description: evidence.getDescription(),
      image: { connect: { id: evidence.getEvidence().getId()! } },
    };
  }

  private static likeToDomain(persist: ReportLikePersist): ReportLike {
    return new ReportLike(persist.userId, persist.reportId, persist.createdAt);
  }
}
