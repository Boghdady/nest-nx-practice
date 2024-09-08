import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app/app.module';

/**
 * Test suite for the First API.
 */
describe('First API', () => {
  let app: INestApplication;
  let server: any;

  /**
   * Asynchronous setup function to initialize the testing module and NestJS application.
   */
  async function setup() {
    // Create a testing module with the AppModule imported and compile it.
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Create a NestJS application instance from the compiled module.
    app = module.createNestApplication();
    // Set a global prefix 'api' for all routes in the application.
    app.setGlobalPrefix('api');

    // Initialize the application.
    await app.init();
    // Retrieve the HTTP server instance from the application.
    server = app.getHttpServer();
  }

  /**
   * Jest lifecycle hook that runs once before all tests in the describe block.
   * It calls the setup function to initialize the application and server.
   */
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api', () => {
    it('should return 200', async () => {
      const response = await request(server).get('/api');
      expect(response.status).toBe(200);
    });
  });
});
