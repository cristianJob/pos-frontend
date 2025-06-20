'use client'


import updateProduct from "@/actions/update-product-action"
import { useParams, useRouter } from "next/navigation"
import React, { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

const EditProductForm = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const {id} = useParams<{id: string}>() // se usa cuando estamos en cliente y queremos utilizar los params que vienen en la url que estan en /edit/page.tsx

   const updateProductWithId = updateProduct.bind(null, +id) // esto se usa para pasar el id a updateproduct
   const [state, dispatch] = useActionState(updateProductWithId, { //React useactionstate es para gestionar los estados de un formulario se le agrega el action y su estado inicial
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
      <input type='submit' className='rounded bg-green-400 font-bold py-2 w-full cursor-pointer mt-5' value='Guardar Cambios'/>
    </form>
  )
}

export default EditProductForm