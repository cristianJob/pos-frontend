"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/app/src/api";
import TransactionSummary from "./transactionSummary";
import { formatCurrency } from '../../src/utils';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TransactionFilter = () => {
  const [date, setDate] = useState<Value>(new Date());

  const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd');
  console.log("tran filter", formattedDate)
  const {data, isLoading} = useQuery({
     queryKey: ['sales', formattedDate],
     queryFn: () => getSalesByDate(formattedDate)
  })

  const total = data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0 // el signo + lo convierte en numero y el signo ?? dice que si es undefined su valor sera 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 relative items-start">
        <div className="lg:sticky lg:top-10">
             <Calendar value={date} onChange={setDate} locale="es"/>
        </div>
        <div>
          {isLoading && 'Cargando...'}
         {data && data.length > 0 ? data.map(transaction => (
          <TransactionSummary
          key={transaction.id}
          transaction={transaction}
          />
         )): <p className="text-lg text-center">No hay ventas en esta fecha</p>}
         <p className="my-5 text-lg font-bold text-right">Total del dia: {' '}
          <span className="font-normal">{formatCurrency(total)}</span>
         </p>
        </div>
    </div>
  )
}

export default TransactionFilter