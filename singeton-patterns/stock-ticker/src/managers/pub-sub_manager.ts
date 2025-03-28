import { RedisClientType } from "redis";
import getRedisInstance from "../redis/client";
import { channel } from "diagnostics_channel";

class PubSubManager {
  static instance: PubSubManager;
  private client: RedisClientType | null;
  private users: Map<string, string[]>;

  private constructor() {
    this.client = null;
    this.users = new Map();
  }

  static async getInstance() {
    if (this.instance) return this.instance;
    this.instance = new PubSubManager();
    this.instance.client = await getRedisInstance();
    return this.instance;
  }

  async userSubscribe(data: { channel: string; userId: string }) {
    if (!this.users?.has(data.channel)) {
      this.users.set(data.channel, []);
    }

    this.users.get(data.channel)?.push(data.userId);
    if (this.users.get(data.channel)?.length === 1) {
      await this.client?.subscribe(data.channel, (message: any) => {
        this.handleMsg({ channel: data.channel, msg: message });
      });
    }
  }

  async userUnSubscribe(data: { channel: string; userId: string }) {
    this.users.set(
      data.channel,
      this.users.get(data.channel)?.filter((uId) => uId != data.userId) || []
    );

    if (this.users.get(data.channel)?.length == 0) {
      this.client?.unsubscribe(data.channel);
      console.log(`channel has been unsibscribed ${data.channel}`);
    }
  }

  async publishData(data: { channel: string; content: any }) {
    await this.client?.publish(data.channel, JSON.stringify(data.content));

  }

  async handleMsg(data: { channel: string; msg: any }) {
    this.users.get(data.channel)?.forEach((uId) => {
      console.log({
        userId: uId,
        content: data.msg,
      });
    });
  }

  async disconnect() {
    await this.client?.disconnect();
  }
}

export default PubSubManager;
