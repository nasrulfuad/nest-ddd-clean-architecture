import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { appConfiguration } from '@src/app.configuration';
import { AppModule } from '@src/app.module';
import { UserUseCase } from '@src/modules/user/constants/user-usecase';
import { UserRepository } from '@src/modules/user/repository/user.repository';
import { CreateUserDto } from '@src/modules/user/web/dto/create-user.dto';
import { UserEntity } from '@src/modules/user/web/entities/user.entity';
import { UserEntityImpl } from '@src/modules/user/web/entities/user.entity-impl';
import * as request from 'supertest';
import { DataSource, EntityManager } from 'typeorm';

describe('UserController', () => {
  let app: INestApplication,
    dataSource: DataSource,
    userRepository: UserRepository<EntityManager>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app = appConfiguration(app);
    await app.init();

    const rd = getRepoAndDataSource(app);
    dataSource = rd.dataSource;
    userRepository = rd.userRepository;
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const q = dataSource.createEntityManager();
    await q.delete(UserEntityImpl, {});
  });

  describe('Find all users', () => {
    it('[GET] /api/v1/users ✅ Find All users', async () => {
      const r: request.Response = await request(app.getHttpServer()).get(
        '/api/v1/users',
      );

      expect(r.statusCode).toBe(HttpStatus.OK);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.OK,
        message: 'Get all users successfully',
        meta: {
          page: 1,
          perPage: 10,
          totalItems: 0,
          totalPage: 0,
        },
        data: [],
      });
    });
  });

  describe('Create user', () => {
    it('[POST] /api/v1/users ✅ Success create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.com',
        age: 13,
        password: 'test123',
      };

      const r: request.Response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(createUserDto);

      expect(r.statusCode).toBe(HttpStatus.CREATED);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.CREATED,
        message: 'Create a user successfully',
        data: {
          id: expect.any(String),
          email: createUserDto.email,
          name: createUserDto.name,
          age: createUserDto.age,
          password: expect.not.stringContaining(createUserDto.password),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });

    it('[POST] /api/v1/users ❌ Failed to create a user because email exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test_email_exist',
        email: 'test_email_exist@test.com',
        age: 13,
        password: 'test123',
      };

      const { dataSource, userRepository } = getRepoAndDataSource(app);

      await dataSource.transaction((transaction) =>
        userRepository.create(transaction, createUserDto),
      );

      const r: request.Response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(createUserDto);

      expect(r.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: 'Email already exists',
      });
    });
  });

  describe('Find user by id', () => {
    it('[GET] /api/v1/users/:id ✅ Success get a user by id', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.com',
        age: 13,
        password: 'test123',
      };

      const user = await dataSource.transaction<UserEntity>((transaction) =>
        userRepository.create(transaction, createUserDto),
      );

      const r: request.Response = await request(app.getHttpServer()).get(
        `/api/v1/users/${user.id}`,
      );

      expect(r.statusCode).toBe(HttpStatus.OK);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.OK,
        message: 'Get a user successfully',
        data: {
          id: expect.any(String),
          email: user.email,
          name: user.name,
          age: user.age,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });

    it('[GET] /api/v1/users/:id ❌ Failed to get a user by id because the id not found', async () => {
      const r: request.Response = await request(app.getHttpServer()).get(
        `/api/v1/users/9d10d81c-39ab-48f1-88e7-3a21725bb245`,
      );

      expect(r.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: 'User not found',
      });
    });
  });

  describe('Delete user by id', () => {
    it('[DELETE] /api/v1/users/:id ✅ Success delete a user by id', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.com',
        age: 13,
        password: 'test123',
      };

      const user = await dataSource.transaction<UserEntity>((transaction) =>
        userRepository.create(transaction, createUserDto),
      );

      const r: request.Response = await request(app.getHttpServer()).delete(
        `/api/v1/users/${user.id}`,
      );

      expect(r.statusCode).toBe(HttpStatus.ACCEPTED);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete a user successfully',
        data: null,
      });
    });

    it('[DELETE] /api/v1/users/:id ❌ Failed to delete a user by id because the id not found', async () => {
      const r: request.Response = await request(app.getHttpServer()).delete(
        `/api/v1/users/9d10d81c-39ab-48f1-88e7-3a21725bb245`,
      );

      expect(r.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(r.body).toEqual({
        responseTime: expect.any(String),
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: 'User not found',
      });
    });
  });
});

function getRepoAndDataSource(app: INestApplication) {
  return {
    userRepository: app.get<UserRepository<EntityManager>>(
      UserUseCase.repositories.UserRepository,
    ),
    dataSource: app.get<DataSource>(DataSource),
  };
}
