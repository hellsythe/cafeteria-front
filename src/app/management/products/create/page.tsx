'use client'
import "reflect-metadata";
import { FormEvent } from 'react'
import { container } from "@/core/product/product.dependencies";
import { CreateProduct } from "@/core/product/usecases/create-product";

export default function CreateProductView() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const createProduct = container.resolve<CreateProduct>("CreateProduct");
    const formData = new FormData(event.currentTarget);
    await createProduct.execute({
            name: formData.get('name') as string,
            price: parseInt(formData.get('price') as string),
    });
  }

  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 w-full items-center">
        <select className="select select-bordered w-full max-w-xs">
            <option disabled>Categoria</option>
            <option>Comida</option>
            <option>Bebida</option>
        </select>
          <input name="name" placeholder="Nombre del producto" className="input input-bordered w-full max-w-xs" />
          <input name="price" placeholder="Precio del producto" className="input input-bordered w-full max-w-xs" />
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
  );
}
