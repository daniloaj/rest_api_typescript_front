import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { deleteProduct, EditAvailable, getProducts } from "../services/ProductService";
import { Product } from "../types";
import { useState } from "react";

export async function Loader() {
  const products = await getProducts();
  return products;
}

export const Products = () => {
  const initialProducts = useLoaderData() as Product[];
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const nav = useNavigate();

  const fetchProducts = async () => {
    const updatedProducts = await getProducts();
    setProducts(updatedProducts!);
  };

  const handleEditAvailability = async (id: number) => {
    await EditAvailable(id);
    fetchProducts(); 
  };

  const handleDelete = async (id: number) => {
    confirm("¿Eliminar?")
    await deleteProduct(id);
    fetchProducts(); 
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar productos
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white ">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr className="border-b" key={item.id}>
                <td className="p-3 text-lg text-gray-800">{item.name}</td>
                <td className="p-3 text-lg text-gray-800 text-center">
                  ${item.price}
                </td>
                <td
                  className="p-3 text-lg text-gray-800 text-center"
                  onClick={() => handleEditAvailability(item.id)}
                >
                  {item.availability ? "Disponible" : "No Disponible"}
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        nav(`/productos/${item.id}/editar`, {
                          state: {
                            item: item,
                          },
                        })
                      }
                      className="rounded-md text-center bg-indigo-600 p-2 w-full text-sm font-bold text-white hover:bg-indigo-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-md bg-red-600 p-2 text-sm font-bold text-white text-center w-full hover:bg-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
