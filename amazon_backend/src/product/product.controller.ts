import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get("/search")
  searchProduct(@Query("name") name) {
    return this.productService.searchProduct(name)
  }

  @Post("/order")
  orders(@Body() order) {
    return this.productService.orders(order);
  }

  @Get("/cache")
  getCache() {
    // CRUD, Reset
    return this.cacheManager.get("DEMO")

  }

  @Get("/del-cache")
  delCache() {
    
    return this.cacheManager.del("DEMO")

  }


  @Get("/set-cache")
  setCache() {
    this.cacheManager.set("DEMO", "hello 123")
    return ""
  }

}
