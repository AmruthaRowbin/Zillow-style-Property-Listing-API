const { createClient } = require('redis');
require('dotenv').config()

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',  // Use Docker host
    port: 6379,
    reconnectStrategy: false,
    connectTimeout: 2000,
  },
});

client.on('error', (err) => {
  console.error('Redis Error:', err.message);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Redis connection failed:', err.message);
  }
})();

module.exports = client;
