import { NatsJetStreamClientProxy } from '@nestjs-plugins/nats-jetstream-transport';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  // constructor(private client: NatsJetStreamClientProxy) {}
  // getHello(): string {
  //   this.client.emit('orders.created', 'hello world').subscribe();
  //   return 'Hello World!';
  // }
  // getBye(): string {
  //   this.client.emit('orders.created', 'bye bye world').subscribe();
  //   return 'Bye Bye World!';
  // }
}

