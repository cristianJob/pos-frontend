'use server'

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/app/src/schemas"
import { revalidatePath } from "next/cache";


export const submitOrderAction = async (data: unknown) => {
     const order = OrderSchema.parse(data)
     const url = `${process.env.API_URL}/transactions`;
     const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...order})
     })
    const res = await req.json();
    if (!req.ok) {
        const error = ErrorResponseSchema.parse(res);
        return {
            errors: error.message.map(issue => issue),
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(res);
    revalidatePath('products-by-category'); // esto vuelve a llamar getProducts por su tag que se agrego
    return {
        errors: [],
        success: success.message
    }
}