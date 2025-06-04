import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  login(loginAuthDto: LoginAuthDto) {
    console.log(' loginAuthDto', loginAuthDto);
    return 'new token';
  }
}
