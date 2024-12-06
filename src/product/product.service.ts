import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";

import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  //create product api
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }
  // get all product api
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  //get product by id api
  async getProductById(id: string): Promise<Product> {
    const prduct: Product = await this.productRepository.findOneBy({ id });
    if (!prduct) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return prduct;
  }
  // update product api by id
  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<boolean> {
    const result = await this.productRepository.update(id, updateProductDto);
    // const product = await this.getProductById(id);
    // const updatedProduct = Object.assign(product, updateProductDto);
    // return this.productRepository.save(updatedProduct);
    if (!result.affected) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return true;
  }

  // delete product api by id
  async deleteProductById(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return true;
    // return result.affected === 1;
  }
}
