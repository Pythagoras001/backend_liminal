import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../../../application/auth.service.js';
import { Public } from './decorator/public-access.decorator.js';
import { LoginUserDto } from '../dto/request/login-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }
}
