
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
 
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again after a minute'
  }
});

module.exports = limiter;
