export class Image {
  constructor(
    private readonly id: string | undefined,
    private readonly publicId: string,
    private readonly originalUrl: string,
    private readonly thumbnailUrl: string,
    private readonly mediumUrl: string,
    private readonly createdAt: Date,
  ) {}

  getId(): string | undefined {
    return this.id;
  }

  getPublicId(): string {
    return this.publicId;
  }

  getOriginalUrl(): string {
    return this.originalUrl;
  }

  getThumbnailUrl(): string {
    return this.thumbnailUrl;
  }

  getMediumUrl(): string {
    return this.mediumUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
