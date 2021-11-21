import { NatsJetStreamClientProxy } from '@nestjs-plugins/nats-jetstream-transport';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  constructor(private client: NatsJetStreamClientProxy) {}
  getHello(): string {
    this.client.emit('order.created', 'hello world').subscribe();
    return 'Hello World!';
  }
  getBye(): string {
    this.client.emit('order.updated', 'bye bye world').subscribe();
    return 'Bye Bye World!';
  }
}

