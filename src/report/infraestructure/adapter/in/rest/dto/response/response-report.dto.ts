import { Expose, Transform } from 'class-transformer';
import { Evidence } from '../../../../../../domain/Evidence';
import { Report } from '../../../../../../domain/Report';

type EvidenceResponse = {
  description: string;
  image: {
    thumbnailUrl: string;
    mediumUrl: string;
    originalUrl: string;
  };
};

function mapEvidence(evidence: Evidence): EvidenceResponse {
  const image = evidence.getEvidence();

  return {
    description: evidence.getDescription(),
    image: {
      thumbnailUrl: image.getThumbnailUrl(),
      mediumUrl: image.getMediumUrl(),
      originalUrl: image.getOriginalUrl(),
    },
  };
}

export class ResponseReportDto {
  @Expose() id: number;
  @Expose() authorId: string;
  @Expose() title: string;
  @Expose() nivel: string;
  @Expose() levelClassId: number;
  @Expose() description: string;
  @Expose() createdAt: Date;

  @Expose()
  @Transform(({ obj }: { obj: Report }) => mapEvidence(obj.getPrincipalEvidence()))
  principalEvidence: EvidenceResponse;

  @Expose()
  @Transform(({ obj }: { obj: Report }) =>
    obj.getGaleryEvidences().map((evidence) => mapEvidence(evidence)),
  )
  galeryEvidences: EvidenceResponse[];

  @Expose()
  @Transform(({ obj }: { obj: Report }) => obj.getLikesCount())
  likesCount: number;
}
