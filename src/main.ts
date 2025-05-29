import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('TemplateMicroservice')
  const app = await NestFactory.createMicroservice(
    AppModule, 
    {
      transport: Transport.NATS,
      options: {
        servers: envs.NATS_SERVER,
      },
    })
  
  await app.listen();
  logger.log(`Template Microservice is listening on port ${process.env.PORT}`);
}
bootstrap();
