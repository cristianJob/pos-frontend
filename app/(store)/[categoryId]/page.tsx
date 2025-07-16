export const dynamic = "force-dynamic";
import ProductCart from "../../../app/components/products/ProductCart";
import { CategoryWithProductsResponseSchema } from "../../../app/src/schemas";
import { redirect } from "next/navigation";
import React from "react";

type Params = Promise<{ categoryId: string }>;

const getProducts = async (categoryId: string) => {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  const req = await fetch(url, {
    next: {
      tags: ['products-by-category'],  // asigna un alias a la consulta
    },
  });
  const json = await req.json();
  if (!req.ok) redirect('/1');
  const product = CategoryWithProductsResponseSchema.parse(json);

  return product;
};

const page = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCart
        key={product.id}
        product={product}
        />
      ))}
      </div>
    </>
  );
};

export default page;
