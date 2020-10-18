import { EventEmitter } from 'events';
import { firstSessionSubscriber } from './first-session.subscriber';
import { lowPollutionSubscriber } from './low-pollution.subscriber';
import { levelUpSubscriber } from './level-up.subscriber';
import { MessageTypes } from './message-types';

export const Broker = new EventEmitter(); 

Broker.on(MessageTypes.newSession, firstSessionSubscriber);
Broker.on(MessageTypes.newSession, lowPollutionSubscriber);
Broker.on(MessageTypes.pointsAdded, levelUpSubscriber);