import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomStrategy } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nats-jetstream-transport';
async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new NatsJetStreamServer(
      'test-service',
      { servers: 'localhost:4222' },
      {
        deliverGroup: 'test-service',
        durable: true,
        deliverTo: 'test-service',
        manualAck: true
      },
      {},
    ),
  };

  // hybrid microservice and web application
  const app = await NestFactory.create(AppModule);
  const microService = app.connectMicroservice(options);
  microService.listen();
  app.listen(3000);
}
bootstrap();
