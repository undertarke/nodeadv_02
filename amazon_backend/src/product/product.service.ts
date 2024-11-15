import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class ProductService {

    constructor(
        private prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async searchProduct(name) {
        let dataCache = await this.cacheManager.get("SEARCH_PRODUCT")

        // kiểm tra cache => 
        if (dataCache) {
            return dataCache
        }

        // SELECT * FROM product WHERE product_name like '%name%'
        let data = await this.prismaService.product.findMany({
            where: {
                product_name: {
                    contains: name
                },
            }
        });

        this.cacheManager.set("SEARCH_PRODUCT", data)

        return data;
    }


    async orders(order) {
        let { email, product_id, user_id, full_name, phone, address } = order;

        // yarn add nodemailer
        // gửi mail xác nhận đơn hàng      
        let configMail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sangrom2003@gmail.com",
                pass: "gsakvdafmyxfdpmo"
            }
        })


        let infoMail = {
            from: "sangrom2003@gmail.com",
            to: email, // "khaitruong2112@gmail.com"
            subject: "Đặt hàng qua Amazon",
            html: "<h1> Xác nhận đơn hàng thành công </h1>"
        }

        configMail.sendMail(infoMail, error => error);

        throw new Error("error")

        // lưu order
        let orderData = await this.prismaService.orders.create({ data: { product_id, user_id } })

        // lưu shipping
        if (orderData) {
            // lưu database shipping bên MySQL
            console.log("Lưu shipping" + orderData.order_id)
        }

        // gửi mail thành công
        infoMail = {
            from: "sangrom2003@gmail.com",
            to: email, // "khaitruong2112@gmail.com"
            subject: "Đặt hàng qua Amazon",
            html: "<h1 style='color:red' > Đặt hàng thành công </h1>"
        }

        configMail.sendMail(infoMail, error => error);

        return "Đặt hàng thành công"

    }
}
