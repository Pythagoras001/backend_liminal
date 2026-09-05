import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose() id: string;
  @Expose() userName: string;
  @Expose() email: string;
  @Expose() createdAt: Date;
}
