import Expo from "expo-server-sdk";
let expo = new Expo();
import dotenv from "dotenv";
dotenv.config();

class ExpoHandler {
  constructor() {}

  async SendPush(pushToken, body) {
    let messages = [];
    messages.push({
      to: pushToken,
      sound: "default",
      body: body
    });
    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default new ExpoHandler();
