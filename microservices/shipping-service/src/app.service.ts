import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) { }
  async shipping(data) {
    let { order_id, email, full_name, address } = data

    let shippingData = await this.prismaService.shipping.create({
      data: { order_id, email, full_name, address }
    })

    return shippingData;
  }
}
