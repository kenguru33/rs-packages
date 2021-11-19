import {
  NatsJetStreamServer,
  NatsJetStreamContext,
} from '@nestjs-plugins/nats-jetstream-transport';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/bye')
  // getBye(): string {
  //   return this.appService.getBye();
  // }

  @EventPattern('user.*')
  public async stationCreatedHandler(
    @Payload() data: string,
    @Ctx() context: NatsJetStreamContext,
  ) {
    context.message.ack();
    console.log('received: ' + context.message.subject, data);
  }

  // @EventPattern('user.updated')
  // public async stationCancelledHandler(
  //   @Payload() data: { id: number; name: string },
  //   @Ctx() context: NatsJetStreamContext,
  // ) {
  //   context.message.ack();
  //   console.log('received: ', data);
  // }

  @EventPattern('order.created')
  public async prderCreatedledHandler(
    @Payload() data: { id: number; name: string },
    @Ctx() context: NatsJetStreamContext,
  ) {
    context.message.ack();
    console.log('received: ', data);
  }
}
