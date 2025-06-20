import { create } from "zustand";
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "./schemas";
import { devtools } from "zustand/middleware";

interface Store {
  total: number;
  discount: number;
  contents: ShoppingCart;
  coupon: Coupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product['id'], quantity: number) => void;
  removeCartItem: (id: Product['id']) => void;
  calculateTotal: () => void;
  applyCoupon: (coupon: string) => Promise<void>;
  applyDiscount: () => void;
  clearOrder: () => void;
}

const inicialState = {
    total: 0,
    discount: 0,
    contents: [],
    coupon: {
      name: '',
      message: '',
      percentage: 0,
    }
}

export const useStore = create<Store>()(devtools((set, get) => ({
    ...inicialState,
    addToCart: (product) => {
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCart = [];
      const duplicated = get().contents.findIndex((item) => item.productId === productId);
      if (duplicated >= 0) {
        if(get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return;
        contents = get().contents.map((item) => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1,
              } : item);
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            productId,
            quantity: 1,
          },
        ];
      }

      set(() => ({
        contents,
      }));
      get().calculateTotal();
    },
    updateQuantity: (id, quantity) => {
      if (quantity < 1) return;
      const contents = get().contents.map((item) => item.productId === id ? { ...item, quantity } : item);
      set(() => ({
        contents,
      }));
      get().calculateTotal();
    },
    removeCartItem: (id) => {
      set(() => ({
        contents: get().contents.filter((item) => item.productId !== id)
      }));
      if(!get().contents.length) {
        get().clearOrder();
      }
      get().calculateTotal();
    },
    calculateTotal: () => {
      const total = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
      set(() => ({
        total,
      }));
      if(get().coupon.percentage > 0) {
        get().applyDiscount();
      }
    },
    applyCoupon: async (couponName) => {
        const req = await fetch('/coupons/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coupon_name: couponName }),
        });
        const json = await req.json();
        const coupon = CouponResponseSchema.parse(json);
        set(() => ({
        coupon,
      }));
      if(coupon.percentage > 0) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const  subTotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)
       const discount = (get().coupon.percentage / 100) * subTotal;
       const total = subTotal - discount;
       set(() => ({
         total,
         discount
       }));
    },
    clearOrder: () => {
      set(() => ({
        ...inicialState,
      }));
    }
  }))
);
