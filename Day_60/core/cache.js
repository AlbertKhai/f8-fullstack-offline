const connectRedis = require("../utils/redis");
module.exports = class {
   static async remember(key, seconds, callback) {
      const redis = await connectRedis();
      let result = await redis.get(key);
      if (!result) {
         result = await callback();
         await redis.set(key, JSON.stringify(result), "EX", seconds);
         return result;
      }
      return JSON.parse(result);
   }
};
