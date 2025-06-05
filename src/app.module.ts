import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './middlewares/token.middleware';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: process.env.DB_TYPE,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    HttpModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('user');
  }
}
