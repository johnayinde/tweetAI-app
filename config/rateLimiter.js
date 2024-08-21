const {RateLimiterMemory} = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({error: "Too many requests"});
    });
};

module.exports = rateLimiterMiddleware;
