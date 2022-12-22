import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TeamsController (e2e)', () => {
  let app: INestApplication;

  let token = '';
  let user;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('teams test login', () => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test4@test.ru',
        password: '12345',
      })
      .expect(200)
      .end((error, response) => {
        if (error) throw error;

        user = JSON.parse(response.text);
        token = user.tokens.access_token;
      });
  });

  it('/teams (POST)', () => {
    return request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        creator: user.id,
        users: [],
      })
      .expect(201);
  });

  it('/teams (GET)', () => {
    return request(app.getHttpServer())
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
