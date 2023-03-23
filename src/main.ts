import { NestFactory } from '@nestjs/core';
import { appConfiguration } from './app.configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);

  app = appConfiguration(app);

  await app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}
bootstrap();
