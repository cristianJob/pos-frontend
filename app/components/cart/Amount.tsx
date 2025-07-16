import { formatCurrency } from "../../src/utils";

type AmountProps = {
  label: string
  amount: number
  discount?: boolean
}
const Amount = ({ label, amount, discount }: AmountProps) => {
  return (
    <div className={`${`flex justify-between`} ${discount && 'bg-green-400 text-green-900 p-1'}`}>
     <dt className="font-bold">{label}</dt>
     <dd className="text-gray-900">{formatCurrency(amount)}</dd>
    </div>
  )
}

export default Amount