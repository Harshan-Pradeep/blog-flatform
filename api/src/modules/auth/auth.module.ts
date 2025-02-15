import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserRepositoy } from './repositories/user.repository';
import { CookieService } from './cookie.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import 'dotenv/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy
    },
    AuthService,
    CookieService,
    JwtStrategy,
    LocalStrategy
  ],
  exports: ['IUserRepository', AuthService]
})
export class AuthModule {}
