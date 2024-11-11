import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get("/search")
  searchProduct(@Query("name") name) {
    return this.productService.searchProduct(name)
  }

  @Post("/order")
  orders(@Body() order){
      return this.productService.orders(order);
  }
}
