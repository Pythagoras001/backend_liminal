import { Expose, Transform } from 'class-transformer';
import { ReportDetailReadModel } from '../../../../../../application/read-model/report-detail.readmodel';
import { mapEvidence } from './response-report.dto';
import type { EvidenceResponse } from './response-report.dto';

type AuthorResponse = {
  id: string | undefined;
  userName: string;
  profileImage?: {
    thumbnailUrl: string;
    mediumUrl: string;
    originalUrl: string;
  };
};

type LevelClassResponse = {
  id: number | undefined;
  type: string;
  classNumber: string | null;
  securityLevel: string;
  legitimacy: string;
  dangerLevel: string;
  description: string;
  iconImage: {
    thumbnailUrl: string;
    mediumUrl: string;
    originalUrl: string;
  };
};

export class ResponseReportDetailDto {
  @Expose() id: number | undefined;
  @Expose() title: string;
  @Expose() nivel: string;
  @Expose() description: string;
  @Expose() createdAt: Date;
  @Expose() likesCount: number;

  @Expose()
  @Transform(({ obj }: { obj: ReportDetailReadModel }) =>
    mapEvidence(obj.principalEvidence),
  )
  principalEvidence: EvidenceResponse;

  @Expose()
  @Transform(({ obj }: { obj: ReportDetailReadModel }) =>
    obj.galeryEvidences.map((evidence) => mapEvidence(evidence)),
  )
  galeryEvidences: EvidenceResponse[];

  @Expose()
  @Transform(({ obj }: { obj: ReportDetailReadModel }) => {
    const profileImage = obj.author.getProfileImage();

    return {
      id: obj.author.getId(),
      userName: obj.author.getUserName(),
      profileImage: profileImage
        ? {
            thumbnailUrl: profileImage.getThumbnailUrl(),
            mediumUrl: profileImage.getMediumUrl(),
            originalUrl: profileImage.getOriginalUrl(),
          }
        : undefined,
    };
  })
  author: AuthorResponse;

  @Expose()
  @Transform(({ obj }: { obj: ReportDetailReadModel }) => {
    const levelClass = obj.levelClass;
    const iconImage = levelClass.getIconImage();

    return {
      id: levelClass.getId(),
      type: levelClass.getType(),
      classNumber: levelClass.getClassNumber(),
      securityLevel: levelClass.getSecurityLevel(),
      legitimacy: levelClass.getLegitimacy(),
      dangerLevel: levelClass.getDangerLevel(),
      description: levelClass.getDescription(),
      iconImage: {
        thumbnailUrl: iconImage.getThumbnailUrl(),
        mediumUrl: iconImage.getMediumUrl(),
        originalUrl: iconImage.getOriginalUrl(),
      },
    };
  })
  levelClass: LevelClassResponse;
}
