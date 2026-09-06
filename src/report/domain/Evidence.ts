import { Image } from "../../image/domain/Image";

export class Evidence {
    constructor(
        private readonly id: string | undefined,
        private readonly evidence: Image,
        private description: string,
    ) {}

    getId(): string | undefined {
        return this.id;
    }

    getEvidence(): Image {
        return this.evidence;
    }

    getDescription(): string {
        return this.description;
    }

    changeDescription(newDescription: string): void {
        this.description = newDescription;
    }
}
