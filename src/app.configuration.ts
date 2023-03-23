import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

export function appConfiguration(app: INestApplication): INestApplication {
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

  return app;
}
