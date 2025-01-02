'use client'
import "reflect-metadata";
import { ProductRepository } from '@/core/product/product.repository';
import { FormEvent } from 'react'
import { container } from "@/core/product/product.dependencies";
import { ProductRemoteRepository } from "@/core/product/product-remote.repository";

export default function CreateProduct() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const productRepository = container.resolve<ProductRepository>("ProductRepository");
    const productRemoteRepository = container.resolve<ProductRemoteRepository>("ProductRemoteRepository");

    const formData = new FormData(event.currentTarget);
    const value = Object.fromEntries(formData.entries());
console.log(value);
    const id = await productRepository.create({
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string),
    });

    await productRemoteRepository.create({
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string),
    });
  }

  return (
    <div className="">
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
    </div>
  );
}
