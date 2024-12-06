import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "상품 이름", example: "iphone 16" })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "상품 가격", example: 1000000 })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "상품 설명", example: "so fasts" })
  desc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "상품 이미지", example: "https://..." })
  productImg: string;
}
