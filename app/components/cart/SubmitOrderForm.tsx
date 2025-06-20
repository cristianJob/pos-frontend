import { submitOrderAction } from "@/actions/submit-order-action";
import { useStore } from "@/app/src/store";
import React, { useActionState, useEffect } from "react";
import { toast } from 'react-toastify';

const SubmitOrderForm = () => {
  const total = useStore((state) => state.total);
  const coupon = useStore((state) => state.coupon.name);
  const contents = useStore((state) => state.contents);
  const clearOrder = useStore((state) => state.clearOrder);
  const order = {
    total,
    coupon,
    contents,
  };

  const submitOrderWithData = submitOrderAction.bind(null, order);
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
      clearOrder();
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <input
        type="submit"
        value="Confirmar Compra"
        className="cursor-pointer mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </form>
  );
};

export default SubmitOrderForm;
