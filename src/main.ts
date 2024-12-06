import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { VersioningType } from "@nestjs/common";
import { TransformInterceptor } from "./common/intercetprors/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //swagger setup

  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix("api");
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: "1",
  // });
  // 이걸 사용하면 /api/v1/ 이런 식으로 버전 관리 가능

  // app.enableCors({
  //   origin: "http://localhost:3000",
  // });

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle("Alice Lab Nest")
    .setDescription("Alice TEST API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(configService.get<number>("BACKEND_PORT"));
}

bootstrap();
