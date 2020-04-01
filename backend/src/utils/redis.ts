import redis from "redis";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  prefix: "sid:"
});
redisClient.unref();
redisClient.on("error", console.log);

export default redisClient;
