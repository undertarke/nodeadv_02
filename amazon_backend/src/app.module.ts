import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CacheManagerModule } from './cache-manager/cache-manager.module';

@Module({
  imports: [
    PrismaModule,

    ConfigModule.forRoot({ isGlobal: true }),

    ProductModule,

    CacheManagerModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
