import { Evidence } from "./Evidence"
import { ReportLike } from "./ReportLike"

export class Report {
    constructor(
        private readonly id: number | undefined,
        private readonly authorId: string,
        private title: string,
        private nivel: string,
        private readonly levelClassId: number,
        private description: string,
        private principalEvidence: Evidence,
        private readonly createdAt: Date,
        private galeryEvidences: Evidence[] = [],
        private likes: ReportLike[] = [],
    ) {}

    getId(): number | undefined {
        return this.id;
    }

    getAuthorId(): string {
        return this.authorId;
    }

    getTitle(): string {
        return this.title;
    }

    getNivel(): string {
        return this.nivel;
    }

    getLevelClassId(): number {
        return this.levelClassId;
    }

    getDescription(): string {
        return this.description;
    }

    getPrincipalEvidence(): Evidence {
        return this.principalEvidence;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getGaleryEvidences(): Evidence[] {
        return [...this.galeryEvidences];
    }

    getLikes(): ReportLike[] {
        return [...this.likes];
    }

    getLikesCount(): number {
        return this.likes.length;
    }

    changeTitle(newTitle: string): void {
        this.title = newTitle;
    }

    changeNivel(newNivel: string): void {
        this.nivel = newNivel;
    }

    changeDescription(newDescription: string): void {
        this.description = newDescription;
    }

    changePrincipalEvidence(newPrincipalEvidence: Evidence): void {
        this.principalEvidence = newPrincipalEvidence;
    }

    addGaleryEvidence(evidence: Evidence): void {
        this.galeryEvidences.push(evidence);
    }

    removeGaleryEvidence(evidenceId: string): void {
        this.galeryEvidences = this.galeryEvidences.filter(
            (evidence) => evidence.getId() !== evidenceId,
        );
    }

    hasLikeFrom(userId: string): boolean {
        return this.likes.some((like) => like.getUserId() === userId);
    }

    toggleLike(userId: string): void {
        if (this.hasLikeFrom(userId)) {
            this.likes = this.likes.filter((like) => like.getUserId() !== userId);
            return;
        }

        this.likes.push(new ReportLike(userId, this.id, new Date()));
    }
}
