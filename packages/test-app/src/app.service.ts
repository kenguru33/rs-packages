import { NatsJetStreamClientProxy } from '@nestjs-plugins/nats-jetstream-transport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private client: NatsJetStreamClientProxy) {}
  createOrder(): string {
    this.client.emit('order.created', 'order created').subscribe();
    return 'order created.';
  }
  updateOrder(): string {
    this.client.emit('order.updated', 'order updated').subscribe();
    return 'order updated';
  }
  deleteOrder(): string {
    this.client.emit('order.deleted', 'order deleted').subscribe();
    return 'order deletes';
  }
}
