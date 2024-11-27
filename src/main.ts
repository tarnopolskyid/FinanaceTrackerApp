import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set global prefix for all routes - http://localhost:3000/api
  app.setGlobalPrefix('api');
  // enable Cross-Origin Resource Sharing
  app.enableCors({
    origin: '*', // Povolení frontendové aplikace běžící na localhostu
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'], // Přidejte hlavičky, které potřebujete
    credentials: true, // Pokud potřebujete posílat cookies nebo jiná pověření
  });
  await app.listen(3000);
}
bootstrap();
