import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './interceptor/global.interceptor';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_COLLECTION}?${process.env.DATABASE_RULES}`,
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: GlobalInterceptor },
  ],
})
export class AppModule {}
