import { CartItem } from "../../../app/src/schemas";
import Image from "next/image";
import { formatCurrency, getImagePath } from '../../src/utils';
import { useStore } from "../../../app/src/store";

export default function ShoppingCartItem({item}: {item: CartItem}) {
    const updateQuantity = useStore((state) => state.updateQuantity);
    const removeCartItem = useStore((state) => state.removeCartItem);
    return (
        <li className="flex items-center space-x-6 py-6 relative">
            <div className='h-24 w-24'>
                <Image
                    src={getImagePath(item.image)} // para que el front pueda acceder a los env se debe agregar un nuvo env NEXT_PUBLIC_ al inicio de la variable de entorno
                    alt={item.name}
                    width={96}
                    height={96}
                    priority
                />
            </div>
            <div className="flex-auto space-y-2">
                <h3 className="text-gray-900">
                    {item.name}
                </h3>
                <p>{formatCurrency(item.price)}</p>
                <select className="w-32 text-center p-2 rounded-lg bg-gray-100" value={item.quantity} onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}>
                    {Array.from({ length: item.inventory }, (_, i) => ( // Crea un array de longitud igual al inventario del producto
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className='absolute top-10 -right-0'>
                <button
                    type="button"
                    onClick={() => removeCartItem(item.productId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </li>
    )
}