import Link from 'next/link'
import React from 'react'

const Pagination = ({page, totalPages}: {page: number, totalPages: number}) => {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1)
    console.log(pages)
  return (
    <nav className='flex justify-center py-10'>
        {page > 1 && (
         <Link href={`/admin/products?pages=${page - 1}`} className='px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'>&laquo;</Link>
        )}

       {pages.map(currenPages => (
        <Link
        key={currenPages}
        href={`/admin/products?page=${currenPages}`}
        className={`${page===currenPages && 'font-black'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}>
        {currenPages}
        </Link>
       ))}
        {page < totalPages && (
         <Link href={`/admin/products?pages=${page + 1}`} className='px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'>&raquo;</Link>
        )}
    </nav>
  )
}

export default Pagination