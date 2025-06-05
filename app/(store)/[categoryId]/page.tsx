import React from "react";

type Params = Promise<{ categoryId: string }>;

 const getProducts = async(categoryId: string) => {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
    const req = await fetch(url);
    const json = await req.json();
    console.info(json);

}

const page = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;
  await getProducts(categoryId);
  return <div>page</div>;
};

export default page;
