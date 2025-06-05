import ProductCard from "@/app/components/products/ProductCard";
import { CategoryWithProductsResponseSchema } from "@/app/src/schemas";
import React from "react";

type Params = Promise<{ categoryId: string }>;

const getProducts = async (categoryId: string) => {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  const req = await fetch(url);
  const json = await req.json();
  const product = CategoryWithProductsResponseSchema.parse(json);

  return product;
};

const page = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"></div>
      {category.products.map((product) => (
        <ProductCard 
        key={product.id}
        />
      ))}
    </>
  );
};

export default page;
