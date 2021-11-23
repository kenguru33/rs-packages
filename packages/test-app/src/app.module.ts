import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscardPolicy, NatsJetStreamTransport } from '@nestjs-plugins/nats-jetstream-transport';
import { StorageType } from '@nestjs-plugins/nats-jetstream-transport/node_modules/nats';

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: 'localhost:4222',
      },
      streamConfig: {
        name: 'mystream',
        subjects: ['order.*'],
        discard: DiscardPolicy.New,
        placement: {cluster: '', tags: ['hhh']},
        storage: StorageType.File,
      },
      jetStreamPublishOptions: {
        
      },
      jetStreamOption: {
      
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
