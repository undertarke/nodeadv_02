import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-postgres';
import { PrismaClient as PrismaClientMysql } from '@prisma/client-mysql';
@Injectable()
export class PrismaPostgreService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}


@Injectable()
export class PrismaMySQLService extends PrismaClientMysql implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}