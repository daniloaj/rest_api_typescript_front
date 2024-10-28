import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";

type AddProductProps = {
  [k: string]: FormDataEntryValue;
};
export async function EditProducto(data: AddProductProps, id: number) {
  try {
    const res = safeParse(ProductSchema, {
      id: id,
      name: data.name,
      price: Number(data.price),
      availability: data.availability == "true" ? true : false,
    });

    if (res.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/product/${
        res.output.id
      }`;
      await axios.put(url, {
        name: res.output.name,
        price: res.output.price,
        availability: res.output.availability,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function EditAvailable(id: number) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct(id: number) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}
export async function AddProduct(data: AddProductProps) {
  try {
    const res = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price),
    });
    if (res.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/product`;
      await axios.post(url, {
        name: res.output.name,
        price: res.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/product`;
    const { data } = await axios(url);
    const res = safeParse(ProductsSchema, data.data);
    if (res.success) {
      return res.output.sort((a, b) => a.id - b.id);
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}
