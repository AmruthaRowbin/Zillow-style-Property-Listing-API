const { createClient } = require('redis');
require('dotenv').config();

let client;

if (process.env.NODE_ENV !== 'test') {
  client = createClient({
    socket: {
      host: '127.0.0.1',//process.env.REDIS_HOST || '127.0.0.1',  // Use Docker host or localhost
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
} else {
  // For test environment, mock a minimal client interface
  client = {
    connect: async () => {},
    get: async () => null,
    set: async () => {},
    del: async () => {},
  };
}

module.exports = client;
