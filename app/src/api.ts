import { TransactionsResponseSchema } from "./schemas";

export const getSalesByDate = async (date: string) => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
    console.log(url)
    const req = await fetch(url);
    const response = await req.json();
    console.log("src/api getsalesbtdate",response)
    const transactions = TransactionsResponseSchema.parse(response);
        return transactions
    }