import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'nestjs_ddd_clean_architecture',
      entities: [`${__dirname}/**/*.entity-impl{.ts,.js}`],
      synchronize: true,
      // dropSchema: true,
      logging: 'all',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
