import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomStrategy } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nats-jetstream-transport';
async function bootstrap() {

  const options: CustomStrategy = {
    strategy: new NatsJetStreamServer(
      'myservice',
      {
      connectOptions: {servers: 'localhost:4222'},
      consumerOptions: {}
    }),
  };
 
  // hybrid microservice and web application
  const app = await NestFactory.create(AppModule);
  const microService = app.connectMicroservice(options)
  microService.listen()
  app.listen(3000)
}
bootstrap();