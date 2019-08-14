import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostGraphileModule } from 'postgraphile-nest';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    HttpModule,
    PostGraphileModule.forRoot({
      pgConfig: process.env.DATABASE_URL,
      playground: true,
      schema: 'public',
      retryOnInitFail: true,
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule { }
