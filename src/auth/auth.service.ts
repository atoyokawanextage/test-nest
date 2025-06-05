import { Inject, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  login(loginAuthDto: LoginAuthDto) {
    const user = this.userService.findByAuth(loginAuthDto);
    //do login
    return user;
  }
}
