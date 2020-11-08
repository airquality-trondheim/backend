import { Expo, ExpoPushMessage, ExpoPushTicket, ExpoPushReceipt, ExpoPushReceiptId} from 'expo-server-sdk';

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
  messageBody: string,
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
      title: message.messageTitle,
      body: message.messageBody,
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
  const receiptIds: ExpoPushReceiptId[] = [];
  for (const ticket of tickets) {
    if ("id" in ticket) {
      receiptIds.push(ticket.id);
    }
  }
  return receiptIds;
}

function checkReceipts(receiptIdChunks: ExpoPushReceiptId[][]) : void {

  (async () => {
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const receipt: ExpoPushReceipt = receipts[receiptId];
          if (receipt.status === 'ok') {
            continue;
          } else if (receipt.status === 'error') {
            console.error(
              `There was an error sending a notification: ${receipt.message}`
            );
            if (receipt.details && receipt.details.error) {
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();

}