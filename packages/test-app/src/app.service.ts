import { NatsJetStreamPubAck, NatsJetStreamClientProxy } from '@nestjs-plugins/nats-jetstream-transport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private client: NatsJetStreamClientProxy) {}
  createOrder(): string {
    this.client.emit<NatsJetStreamPubAck, string>('order.created', 'order created').subscribe((res) => {
      console.log(res)
    });
    return 'order created.';
  }
  updateOrder(): string {
    this.client.emit('order.updated', 'order updated').subscribe();
    return 'order updated';
  }
  deleteOrder(): string {
    this.client.send<NatsJetStreamPubAck, string>('order.deleted', 'order deleted by send message').subscribe(res => {
      console.log(res)
    })
    return 'order deletes';
  }
}
