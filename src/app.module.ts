import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './modules/app.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => {
        return {
          type: 'postgres',
          host: c.get<string>('DATABASE_PG_HOST'),
          port: +c.get<number>('DATABASE_PG_PORT'),
          username: c.get<string>('DATABASE_PG_USERNAME'),
          password: c.get<string>('DATABASE_PG_PASSWORD'),
          database: c.get<string>('DATABASE_PG_DB_NAME'),
          entities: [`${__dirname}/**/*.entity-impl{.ts,.js}`],
          synchronize: c.get<string>('DATABASE_PG_DROP_SYNCHRONIZE') === 'true',
          dropSchema: c.get<string>('DATABASE_PG_DROP_SCHEMA') === 'true',
          logging: c.get<string>('DATABASE_PG_LOGGING') === 'true',
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
