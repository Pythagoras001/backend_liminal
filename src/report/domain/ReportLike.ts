export class ReportLike {
    constructor(
        private readonly userId: string,
        private readonly reportId: number | undefined,
        private readonly createdAt: Date,
    ) {}

    getUserId(): string {
        return this.userId;
    }

    getReportId(): number | undefined {
        return this.reportId;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
}
