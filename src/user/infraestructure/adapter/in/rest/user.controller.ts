import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from '../../../../application/user.service';
import { CreateUserDto } from '../../dto/request/create-user.dto';
import { UpdateUserDto } from '../../dto/request/update-user.dto';
import { ResponseUserDto } from '../../dto/response/response-user.dto';
import { UserQueryService } from '../../../../application/user.query.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userQueryService: UserQueryService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.userQueryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.update(id, updateUserDto);
  }
}
