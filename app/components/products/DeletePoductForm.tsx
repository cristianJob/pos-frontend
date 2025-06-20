import { revalidatePath } from "next/cache";
import React from "react";

const DeletePoductForm = ({ productId }: { productId: number }) => {
  const handleDeletePRoduct = async () => {
    "use server";

    const url = `${process.env.API_URL}/products/${productId}`;
    const req = await fetch(url, {
      method: "DELETE"
    });
    await req.json();
    revalidatePath('/admin/products') // se utiliza solo en server y hace casi lo mismo que router.push pero este se utiliza para actualizar la data en cache
  };
  return (
    <form action={handleDeletePRoduct}>
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 curor-pointer"
        value="Eliminar"
      />
    </form>
  );
};

export default DeletePoductForm;
