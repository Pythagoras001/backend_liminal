import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserQueryService } from '../../user/application/user.query.service';
import { LoginUserDto } from '../infraestructure/adapter/in/dto/request/login-user.dto';

@Dependencies(UserQueryService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly userQueryService: UserQueryService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userQueryService.findByEmail(signInDto.email);
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.getPassword(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.getId(), sub: user.getId() };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
