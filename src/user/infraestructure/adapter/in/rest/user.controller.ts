import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../../../../application/user.service';
import { CreateUserDto } from '../../dto/request/create-user.dto';
import { UpdateUserDto } from '../../dto/request/update-user.dto';
import { ResponseUserDto } from '../../dto/response/response-user.dto';
import { UserQueryService } from '../../../../application/user.query.service';
import { Public } from '../../../../../auth/infraestructure/adapter/in/rest/decorator/public-access.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userQueryService: UserQueryService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.create(createUserDto);

    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.userQueryService.findById(id);

    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userService.update(id, updateUserDto);

    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
