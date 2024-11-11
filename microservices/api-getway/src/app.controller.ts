import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,
  ) { }

  @Get("/get-product")
  async getHello() {

    let dataProduct = await lastValueFrom(this.productService.send("get_product", "hello"))
    return dataProduct;
  }

  @Post("/order")
  async order(@Body() order) {
    let { email, product_id, user_id, full_name, phone, address } = order;

    // gửi mail xác nhận đơn hàng    
    // this.notifyService.emit("confirm_product", email);


    // lưu order
    let order_data = await lastValueFrom(this.productService.send("order_key", order));


    console.log(order_data)

    return "Đặt hàng thành công"

  }
}
