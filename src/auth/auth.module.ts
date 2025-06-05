import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
