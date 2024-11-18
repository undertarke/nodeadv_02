import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({isGlobal:true}),
    ClientsModule.register([
      {
        name: "NOTIFY_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: "notify_queue",
          queueOptions: {
            durable: false
          },
          persistent: false
        }
      }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
