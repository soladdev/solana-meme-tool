import { createClient } from 'redis';
import { REDIS_URI } from '../constant';

export const redisClient = await createClient({
    url: REDIS_URI
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();