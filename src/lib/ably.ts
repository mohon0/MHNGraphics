import Ably from "ably";

// Create a single instance of the Ably REST client for server-side operations
export const ablyRest = new Ably.Rest(process.env.ABLY_API_KEY || "");

// Helper function to get a channel with proper error handling
export const getChannel = (channelName: string) => {
  try {
    return ablyRest.channels.get(channelName);
  } catch (error) {
    console.error(`Error getting channel ${channelName}:`, error);
    throw error;
  }
};

// Helper function to publish a message to a channel
export const publishMessage = async (
  channelName: string,
  eventName: string,
  data: any,
) => {
  try {
    const channel = getChannel(channelName);
    await channel.publish(eventName, data);
  } catch (error) {
    console.error(`Error publishing to ${channelName}:`, error);
    throw error;
  }
};
