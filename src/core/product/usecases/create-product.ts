import type { RepositoryInterface } from "@/core/global/repository.interface";
import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../dtos/create-product.dto";

@injectable()
export class CreateProduct {
  constructor(
    @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product>,
    @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product>
  ) {
  }

  async execute(product: CreateProductDto): Promise<string> {
    const id = await this.productLocalRepository.create(product);
    await this.productRemoteRepository.create(product);

    return id;
  }
}