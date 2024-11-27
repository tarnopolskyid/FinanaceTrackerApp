import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Nastavení CORS
  app.enableCors({
    origin: 'https://finanace-tracker-app-frontend.vercel.app', // Povolit požadavky z této domény
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Povolené HTTP metody
    allowedHeaders: ['Content-Type', 'Authorization'], // Povolené hlavičky
    credentials: true, // Pokud chcete povolit cookies nebo jiné credentials
  });
  await app.listen(3000);
}
bootstrap();
