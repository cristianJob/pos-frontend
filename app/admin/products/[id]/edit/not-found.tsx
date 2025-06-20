import Heading from '@/app/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='text-center'>
      <Heading>Producto no encontrado</Heading>
      <p>Tal vez quisieras volver a <Link href={`/admin/products`} className='text-green-400'>Productos</Link></p>
    </div>
  )
}

export default notFound