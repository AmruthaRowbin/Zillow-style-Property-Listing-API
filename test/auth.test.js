const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app');

jest.setTimeout(30000)

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/propertylist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/v1/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
        role: 'admin'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
