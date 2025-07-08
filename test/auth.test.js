
jest.setTimeout(20000);
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app'); 
const User = require('../models/User');
const Property = require('../models/Property');
process.env.JWT_SECRET = 'testsecretkey';

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Create a test user
  const user = await User.create({
    name: 'Test Admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin'
  });

  userId = user._id;
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/v1/properties', () => {
  it('should create a new property', async () => {
    const res = await request(app)
      .post('/api/v1/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Property',
        description: 'A lovely test house',
        location: 'Test City',
        price: 500000,
        bedrooms: 3
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Test Property');
  });
});
