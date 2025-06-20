'use client'

import addProduct from "@/actions/add-product-action"
import { useRouter } from "next/navigation"
import React, { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

const AddProductForm = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()

  const [state, dispatch] = useActionState(addProduct, { //React useactionstate es para gestionar los estados de un formulario se le agrega el action y su estado inicial
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(state.errors) {
      state.errors.forEach(error => toast.error(error))
    }

    if(state.success) {
      toast.success(state.success)
      router.push('/admin/products') // Redirige a la lista de productos después de agregar uno nuevo
    }
  },[state])

  return (
    <form className="space-y-5" action={dispatch}>
      {children}
      <input type='submit' className='rounded bg-green-400 font-bold py-2 w-full cursor-pointer mt-5' value='Agregar Producto'/>
    </form>
  )
}

export default AddProductForm