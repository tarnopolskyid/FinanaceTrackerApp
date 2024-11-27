import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set global prefix for all routes - http://localhost:3000/api
  app.setGlobalPrefix('api');
  // enable Cross-Origin Resource Sharing
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
