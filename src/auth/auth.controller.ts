import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CatFactDto } from './dto/cat-fact.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Get('cat')
  async getCatFactAsync(): Promise<CatFactDto> {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get<CatFactDto>('https://catfact.ninja/fact'),
    );
    return response.data as CatFactDto;
  }
}
