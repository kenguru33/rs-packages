import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nats-jetstream-transport'

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: 'localhost:4222'
      },
      streamConfig: {
        subjects: ['order.*']
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
