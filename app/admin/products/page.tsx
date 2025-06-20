import ProductsTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import Pagination from "@/app/components/ui/Pagination";
import { ProductsResponseSchema } from "@/app/src/schemas";
import { isValidPage } from "@/app/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const getPRoducts = async (take: number, skip: number) => {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  console.log(url)
  const req = await fetch(url);
  const json = await req.json();
  console.log(json)
  const data = await ProductsResponseSchema.parse(json);
  return {
    products: data.products,
    total: data.total,
  };
};

type SearchParams = Promise<{ page: string }>; // esto es de next y es para obtener params de la url

const ProductsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { page } = await searchParams;
  if (!isValidPage(+page)) return redirect("/admin/products?page=1");

  const productPerPage = 10;
  const skip = (+page - 1) * productPerPage;

  const { products, total } = await getPRoducts(productPerPage, skip);

  const totalPages = Math.ceil(total / productPerPage)
  if(+page > totalPages) return redirect("/admin/products?page=1");

  return (
    <div>
      <Link href={`/admin/products/new`} className="rounded bg-green-400 font-bold py-2 px-10">Nuevo Producto</Link>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products}/>
      <Pagination
      page={+page}
      totalPages={totalPages}
      />
    </div>
  );
};

export default ProductsPage;
