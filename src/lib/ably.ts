import * as Ably from "ably";

export class AblyService {
  private static instance: Ably.Realtime;

  public static getInstance(): Ably.Realtime {
    if (!AblyService.instance) {
      const apiKey = process.env.ABLY_API_KEY;

      if (!apiKey) {
        throw new Error("ABLY_API_KEY is not defined");
      }

      AblyService.instance = new Ably.Realtime({
        key: apiKey,
        clientId: "server",
      });
    }

    return AblyService.instance;
  }
}
