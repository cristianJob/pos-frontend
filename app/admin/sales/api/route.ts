import { NextRequest } from "next/server"

export const GET = async(request: NextRequest) => {
    const { searchParams } = request.nextUrl
    const transactionDate = searchParams.get("transactionDate")
    console.log("desde api route get", transactionDate)
    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`;
    console.log(url)
    const req = await fetch(url);
    const response = await  req.json()
    return Response.json(response)
}