import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Set path global prefix */
  app.setGlobalPrefix('api');
  /** Enable URI versioning */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /** Set global validation */
  app.useGlobalPipes(
    new ValidationPipe({
      /** Only data validated can be processed */
      whitelist: true,
      /** Transform data to dto object */
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}
bootstrap();
