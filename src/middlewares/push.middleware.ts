import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

/**
 * Example for sending a push notification:
 * 
 * import * as PushNotificationMiddleware from '/path/to/push.middleware'
 * 
 * const somePushTokens = ["ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"]
 * PushNotificationMiddleware.sendPushNotifications(somePushTokens, {
 *   messageTitle: "En test av push-notifikasjoner",
 *   messageData: { withsome: "data" }
 * }) 
 */

type PushMessageInfo = {
  messageTitle: string,
  messageData: Record<string, unknown>,
}

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export function sendPushNotifications(pushTokens: string[], message: PushMessageInfo) : void {

  const messages = createMessages(pushTokens, message);

  const chunks = expo.chunkPushNotifications(messages);

  const tickets = sendChunkedMessages(chunks);

  const receiptIds = createReceiptIds(tickets);

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  checkReceipts(receiptIdChunks);

}

function createMessages(pushTokens: string[], message: PushMessageInfo) : ExpoPushMessage[] {
  const messages: ExpoPushMessage[] = [];
  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      body: message.messageTitle,
      data: message.messageData,
    })
  }

  return messages;
}

function sendChunkedMessages(messageChunks: ExpoPushMessage[][]) : ExpoPushTicket[] {
  const tickets: ExpoPushTicket[] = [];
  (async () => {
    for (const chunk of messageChunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  return tickets;
}

function createReceiptIds(tickets: ExpoPushTicket[]) : string[] {
  const receiptIds: string[] = [];
  for (const ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  return receiptIds;
}

function checkReceipts(receiptIdChunks: string[][]) : void {

  (async () => {
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();

}