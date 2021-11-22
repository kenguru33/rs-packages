import {
  NatsJetStreamPubAck,
  NatsJetStreamClientProxy,
} from '@nestjs-plugins/nats-jetstream-transport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private client: NatsJetStreamClientProxy) {}

  createOrder(): string {
    this.client
      .emit<NatsJetStreamPubAck, string>('order.created', 'order created')
      .subscribe((res) => {
        console.log(res);
      });
    return 'order created.';
  }

  updateOrder(): string {
    this.client.emit('order.updated', 'order updated').subscribe();
    return 'order updated';
  }

  deleteOrder(): string {
    this.client
      .send<NatsJetStreamPubAck, {message: string, type:string}>(
        'order.deleted',
        {message: 'order deleted', type:'with send'},
      )
      .subscribe((res) => {
        console.log(res);
      });
    return 'order deletes';
  }
}
