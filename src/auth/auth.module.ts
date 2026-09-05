import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infraestructure/adapter/in/rest/auth.controller.js';
import { jwtConstants } from './constants.js';
import { AuthGuard } from './infraestructure/security/auth.guard.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './application/auth.service.js';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
