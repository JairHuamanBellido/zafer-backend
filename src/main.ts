import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  await app.listen(process.env.PORT || 3010);
}
bootstrap();
