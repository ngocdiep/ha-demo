import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  /**
   * uncomment this line and comment line 17 when running app by: npm run start:dev
   */
  // app.useStaticAssets(join(__dirname, '../uploadedFiles'), { prefix: '/storage/' });

  // this is used when running app in docker-compose or k8s cluster
  app.useStaticAssets(join(__dirname, './uploadedFiles'), { prefix: '/storage/' });

  app.useStaticAssets(join(__dirname, './frontend'), { prefix: '/ha-demo/ui/' });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
