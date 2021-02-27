const rateLimit = require('express-rate-limit');

module.exports = rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1000, // 24 hrs in milliseconds
  max: 5,
  message: 'You have exceeded requests!', 
  headers: true,
});

