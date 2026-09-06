import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { LevelClassService } from '../../../../application/level-class.service';
import { LevelClassQueryService } from '../../../../application/level-class.query.service';
import { CreateLevelClassDto } from './dto/request/create-level-class.dto';
import { UpdateLevelClassDto } from './dto/request/update-level-class.dto';
import { ResponseLevelClassDto } from './dto/response/response-level-class.dto';
import { Public } from '../../../../../auth/infraestructure/adapter/in/rest/decorator/public-access.decorator';

@Controller('class')
export class LevelClassController {
  constructor(
    private readonly levelClassService: LevelClassService,
    private readonly levelClassQueryService: LevelClassQueryService,
  ) {}

  @Public()
  @Get()
  async findAll(): Promise<ResponseLevelClassDto[]> {
    const levelClasses = await this.levelClassQueryService.findAll();

    return plainToInstance(ResponseLevelClassDto, levelClasses, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async create(
    @Body() createLevelClassDto: CreateLevelClassDto,
    @UploadedFile() icon?: Express.Multer.File,
  ): Promise<ResponseLevelClassDto> {
    if (!icon) {
      throw new BadRequestException('icon is required');
    }

    const levelClass = await this.levelClassService.create(
      createLevelClassDto,
      icon.buffer,
    );

    return plainToInstance(ResponseLevelClassDto, levelClass, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('icon'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLevelClassDto: UpdateLevelClassDto,
    @UploadedFile() icon?: Express.Multer.File,
  ): Promise<ResponseLevelClassDto> {
    const levelClass = await this.levelClassService.update(
      id,
      updateLevelClassDto,
      icon?.buffer,
    );

    return plainToInstance(ResponseLevelClassDto, levelClass, {
      excludeExtraneousValues: true,
    });
  }
}
