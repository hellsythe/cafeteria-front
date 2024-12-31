'use client';
import { useEffect } from "react";
import Form from 'next/form'

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return (
    <div className="">
      <Form action="/search">
        <div className="flex flex-col gap-4 w-full items-center">
        <select className="select select-bordered w-full max-w-xs">
            <option disabled>Categoria</option>
            <option>Comida</option>
            <option>Bebida</option>
        </select>
          <input name="query" placeholder="Nombre del producto" className="input input-bordered w-full max-w-xs" />
          <input name="query" placeholder="Precio del producto" className="input input-bordered w-full max-w-xs" />
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </Form>
    </div>
  );
}
