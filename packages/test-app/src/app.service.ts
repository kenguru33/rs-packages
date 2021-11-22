import {
  NatsJetStreamPubAck,
  NatsJetStreamClientProxy,
} from '@nestjs-plugins/nats-jetstream-transport';
import { Injectable } from '@nestjs/common';

interface OrderCreatedEvent {
  id: number;
  product: string;
  quantity: number;
}
interface OrderUpdatedEvent {
  id: number;
  quantity: number;
}
interface OrderDeleteEvent {
  id: number;
}

const ORDER_CREATED = 'order.created';
const ORDER_UPDATED = 'order.updated';
const ORDER_DELETED = 'order.deleted';

@Injectable()
export class AppService {
  constructor(private client: NatsJetStreamClientProxy) {}

  createOrder(): string {
    this.client
      .emit<NatsJetStreamPubAck, OrderCreatedEvent>(ORDER_CREATED, {
        id: 1,
        product: 'Socks',
        quantity: 1,
      })
      .subscribe((pubAck) => {
        console.log(pubAck);
      });
    return 'order created.';
  }

  updateOrder(): string {
    this.client
      .emit<null, OrderUpdatedEvent>(ORDER_UPDATED, { id: 1, quantity: 10 })
      .subscribe();
    return 'order updated';
  }

  deleteOrder(): string {
    this.client
      .send<NatsJetStreamPubAck, OrderDeleteEvent>(ORDER_DELETED, { id: 1 })
      .subscribe((pubAck) => {
        console.log(pubAck.seq);
      });
    return 'order deleted';
  }
}
