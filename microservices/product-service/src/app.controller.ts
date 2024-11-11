import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
 
  ) { }

  @MessagePattern("get_product")
  getProduct(@Payload() data) {
    console.log(data)

    return this.appService.getProduct();
  }

  @MessagePattern("order_key")
  orders(@Payload() data) {


    return this.appService.orders(data);
  }
}

// yarn add prisma @prisma/client
// yarn prisma init
// update .env 
// yarn prisma db pull
// yarn prisma generate

// yarn add @nestjs/config