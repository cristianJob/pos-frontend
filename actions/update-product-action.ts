"use server";

import { ErrorResponseSchema, Product, ProductFormSchema } from "@/app/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

const updateProduct = async (productId:Product['id'],prevState: ActionStateType, formData: FormData) => {
  const product = ProductFormSchema.safeParse({
    // es para mostrar los mensajes de error que vienen de z schema
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    inventory: formData.get("inventory"),
    categoryId: formData.get("categoryId"),
  });

  if (!product.success) {
    return {
      errors: product.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/products/${productId}`
  const req = await  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(product.data)
  })
  const json = await req.json()

  console.log(json)
  if(!req.ok) {
    const errors = ErrorResponseSchema.parse(json)
    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    }
  }

  return {
    errors: [],
    success: "Producto modificado correctamente",
  };
};

export default updateProduct;
