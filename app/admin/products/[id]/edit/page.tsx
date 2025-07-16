import EditProductForm from '../../../../components/products/EditProductForm'
import ProductForm from '../../../../components/products/ProductForm'
import Heading from '../../../../components/ui/Heading'
import { ProductSchema } from '../../../../src/schemas'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Params = Promise<{ id: string }>;


const EditProductPage = async ({params}: {params: Params}) => { // para obtener un campo desde la url es necesario agregar un promise params y agregar await ademas del nombre id que debe coincidir con la carpeta [id]

  const getProduct = async() => {
     const url = `${process.env.API_URL}/products/${id}`
     const req = await fetch(url)
     const json = await req.json()
     if (!req.ok) return notFound()
      const product = ProductSchema.parse(json)
     return product
  }
  const { id } = await params
  const product = await getProduct()

  return (
    <>
     <Link href={`/admin/products?page=1`} className="rounded bg-green-400 font-bold py-2 px-10">Volver</Link>
     <Heading>Editar Producto</Heading>
     <EditProductForm>
        <ProductForm product={product}/>
     </EditProductForm>
    </>
  )
}

export default EditProductPage