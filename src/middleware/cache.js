const redis = require('redis');
const client = redis.createClient();

const cache = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl}` || req.url;
    client.get(key, (err, reply) => {
      if (reply) {
        res.send(JSON.parse(reply));
        return;
      }
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    });
  };
};

module.exports = cache; 