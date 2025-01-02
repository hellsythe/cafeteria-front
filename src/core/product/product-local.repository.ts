import type { UuidGeneratorInterface } from "../global/services/interfaces/uuid-generator.interface";
import { db, Product } from "./db";
import { inject, injectable } from "tsyringe"
import { RepositoryInterface } from "../global/repository.interface";
import { CreateProductDto } from "./dtos/create-product.dto";

@injectable()
export class ProductLocalRepository implements RepositoryInterface<Product> {
   constructor(@inject('UuidGenerator') private readonly uuidService: UuidGeneratorInterface) {}

    async create(product: CreateProductDto): Promise<string> {
      const id = await db.products.add({
        id:this.uuidService.generate(),
        ...product
      });

      if (typeof id == 'string') {
         return id;
      }

      throw new Error('Failed to create product: ID was not returned as a string.');
   }
}