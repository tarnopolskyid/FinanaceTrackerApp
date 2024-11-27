import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serverless from 'serverless-http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Získání instance Express pro serverless-http
  const expressApp = app.getHttpAdapter().getInstance();

  // Obalit Express aplikaci pomocí serverless-http
  const handler = serverless(expressApp);

  // Exportovat handler pro serverless prostředí
  exports.handler = async (event: Request, context: Response) => {
    return handler(event, context);
  };
}
bootstrap();
