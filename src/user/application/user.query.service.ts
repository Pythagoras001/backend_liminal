import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserQueryService {
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
