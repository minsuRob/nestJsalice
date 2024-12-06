import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    //     TypeOrmModule.forRoot({
    //       type: "postgres",
    //       host: process.env.DB_HOST,
    //       port: +process.env.DB_PORT,
    //       username: process.env.DB_USERNAME,
    //       password: process.env.DB_PASSWORD,
    //       database: "alicedb",
    //       //   database: "route",
    //       //   synchronize: process.env.NODE_ENV !== "prod",
    //       //   logging: process.env.NODE_ENV !== "prod",
    //       //   entities: [User, Verification, Restaurant, Category],
    //     }),
    //   ],
  ],
})
export class DatabaseModule {}
