'use client'
import React from 'react'
import { useStore } from '@/app/src/store'
import ShoppingCartItem from './ShoppingCartItem';
import Amount from './Amount';
import CouponForm from './CouponForm';
import SubmitOrderForm from './SubmitOrderForm';

const ShoppingCart = () => {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);
  return (
    <>
    <h2 className='text-4xl font-bold text-gray-900'>Resumen de venta</h2>
    <ul role='list' className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'>
      {contents.map((item) => (
        <ShoppingCartItem key={item.productId} item={item} />
      ))}
    </ul>
    <dl className='space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500'>
      {discount > 0 && (
        <Amount
          label='Descuento'
          amount={-discount}
          discount={true}
          />
      )}
      <Amount
      label='Total a Pagar'
      amount={total}
      />
    </dl>
    <CouponForm />
    <SubmitOrderForm />
    </>
  )
}

export default ShoppingCart