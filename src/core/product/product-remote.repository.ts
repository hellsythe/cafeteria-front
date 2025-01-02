import { injectable } from "tsyringe";
import { RepositoryInterface } from "../global/repository.interface";
import { CreateProductDto } from "./dtos/create-product.dto";

@injectable()
export class ProductRemoteRepository implements RepositoryInterface<CreateProductDto> {
  url: string;
  constructor() {
    this.url = process.env.NEXT_PUBLIC_PRODUCT_API_URL || '';
  }

  async create(data: CreateProductDto): Promise<string> {
    console.log(this.url);
    console.log(process.env.NEXT_PUBLIC_PRODUCT_API_URL);
    console.log(process.env.NEXT_PUBLIC_HEY);
     await fetch(`${this.url}/product`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        return response
      })

      console.log(999999);
      return 'ok';
    // throw new Error("Method not implemented.");
  }
}