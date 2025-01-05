"use client";
import "reflect-metadata";
import Link from "next/link";
import { container } from "@/core/product/product.dependencies";
import { FindProduct } from "@/core/product/usecases/find-product";
import { useEffect, useState } from "react";
import { Product } from "@/core/product/product.model";
import { DeleteProduct } from "@/core/product/usecases/delete-product";

export default function CreateProductView() {
  const [data, setData] = useState(new Array<Product>());
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const findProduct = container.resolve<FindProduct>("FindProduct");
    findProduct.execute({}).then((data) => {
      setData(data);
      // setLoading(false);
    });
  }, []);

  const deleteProduct = async (id: string) => {
    const deleteProduct = container.resolve<DeleteProduct>("DeleteProduct");
    await deleteProduct.execute(id);
    setData(data.filter((product) => product.id !== id));
  };

  return (
    <div className="">
      <Link href={"/management/products/create"} className="btn btn-primary">
        Crear producto
      </Link>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="cap-2">
                  <Link href={`/management/products/edit/${product.id}`} className="btn btn-primary">
                    Editar
                  </Link>
                  <button className="btn btn-error" onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
