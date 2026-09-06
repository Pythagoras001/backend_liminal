import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LevelClassService } from '../../../../application/level-class.service';
import { CreateLevelClassDto } from './dto/request/create-level-class.dto';
import { UpdateLevelClassDto } from './dto/request/update-level-class.dto';
import { ResponseLevelClassDto } from './dto/response/response-level-class.dto';

@Controller('class')
export class LevelClassController {
  constructor(private readonly levelClassService: LevelClassService) {}

  @Post()
  async create(
    @Body() createLevelClassDto: CreateLevelClassDto,
  ): Promise<ResponseLevelClassDto> {
    const levelClass =
      await this.levelClassService.create(createLevelClassDto);

    return plainToInstance(ResponseLevelClassDto, levelClass, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLevelClassDto: UpdateLevelClassDto,
  ): Promise<ResponseLevelClassDto> {
    const levelClass = await this.levelClassService.update(
      id,
      updateLevelClassDto,
    );

    return plainToInstance(ResponseLevelClassDto, levelClass, {
      excludeExtraneousValues: true,
    });
  }
}
