import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyInstance } from 'fastify';
import { Server } from 'node:http';
import request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { HealthController } from '../src/api/health/health.controller';
import { ConfigService } from '@nestjs/config';

describe('HealthController (e2e)', () => {
  let app: NestFastifyApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test'),
            getOrThrow: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn().mockResolvedValue({ status: 'ok' }),
          },
        },
        {
          provide: HttpHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: MicroserviceHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            createBasicAuthHeaders: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.listen(0);
    const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();
    await fastifyInstance.ready();
    server = app.getHttpServer();
  });

  it('/health (GET)', () => {
    return request(server)
      .get('/health')
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchObject({
          status: 'ok',
        });
      });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
