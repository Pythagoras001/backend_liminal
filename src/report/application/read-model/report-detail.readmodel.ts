import { SurvivalClassEntity } from '../../../level-class/domain/LevelClass';
import { User } from '../../../user/domain/User';
import { Evidence } from '../../domain/Evidence';

export class ReportDetailReadModel {
  constructor(
    public readonly id: number | undefined,
    public readonly title: string,
    public readonly nivel: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly principalEvidence: Evidence,
    public readonly galeryEvidences: Evidence[],
    public readonly likesCount: number,
    public readonly author: User,
    public readonly levelClass: SurvivalClassEntity,
  ) {}
}
