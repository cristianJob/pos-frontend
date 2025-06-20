import Link from "next/link";
import Logo from "./Logo";
import { CategoryResponseSchema } from "@/app/src/schemas";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  const categories = CategoryResponseSchema.parse(json);
  return categories;
}

export default async function MainNav() {

  const categories = await getCategories();
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
         <Logo />
      </div>
      <nav className="flex flex-col md:flex-row gap-5 items-center mt-5 md:mt-0">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="text-white hover:text-green-400 transition-colors font-bold py-2"
          >
            {category.name}
          </Link>
        ))}
        <Link href={"/admin/sales"} className="rounded bg-green-400 font-bold py-2 px-5">Panel de administracion</Link>
      </nav>
    </header>
  );
}
