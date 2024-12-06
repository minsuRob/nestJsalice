import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { ProductModule } from "./product/product.module";
import * as Joi from "@hapi/joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product/entities/product.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        BACKEND_PORT: Joi.number().required(),
      }),
    }),

    // DatabaseModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // synchronize: process.env.NODE_ENV !== "prod",
      // logging: process.env.NODE_ENV !== "prod",
      entities: [Product],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
