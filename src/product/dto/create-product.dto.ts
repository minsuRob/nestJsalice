import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ description: "상품 이름", example: "iphone 16" })
  name: string;
  @ApiProperty({ description: "상품 가격", example: 1000000 })
  price: number;
  @ApiProperty({ description: "상품 설명", example: "so fasts" })
  desc: string;
  @ApiProperty({ description: "상품 이미지", example: "https://..." })
  productImg: string;
}
