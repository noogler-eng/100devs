import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";
dotenv.config();

let client: RedisClientType | null;

const getRedisInstance = async (): Promise<RedisClientType> => {
  if (!client) {
    client = await createClient({
      url: process.env.REDIS_URL!,
    });

    client.on("error", (err) => console.error("Redis Client Error", err));

    await client.connect();
  }

  return client;
};

export default getRedisInstance;
