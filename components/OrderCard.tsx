// components/OrderCard.tsx
import { formatNumberAbbreviation, getPublicKeyFromPrivateKey, shortenAddress } from '@/base/utils'
import { OrderProps } from '@/lib/types'
import { format } from 'date-fns'

export default function OrderCard({ order }: { order: OrderProps }) {
  const createdDate = new Date(order.createdAt)
  const limitDate = new Date(createdDate.getTime() + order.expireTime * 1000)
  const limitTimeFormatted = format(limitDate, 'yyyy-MM-dd HH:mm:ss')

  return (
    <div className="max-w-md mx-auto my-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 py-3 border border-gray-200 dark:border-gray-700">
        <h2 className={`text-sm font-semibold mb-4 ${order.isBuy ? 'text-green-600' : 'text-theme'}`}>
          {order.isBuy ? 'Buy Order' : 'Sell Order'}
        </h2>

        <div className="space-y-2 text-[13px] text-gray-800 dark:text-gray-200">
          <div className='flex flex-row gap-5'>
            <span className="font-medium">Wallet Address:</span>
            <p className="break-all">{shortenAddress(getPublicKeyFromPrivateKey(order.privateKey))}</p>
          </div>

          <div className='flex flex-row gap-5'>
            <span className="font-medium">Token Address:</span>
            <p className="break-all">{shortenAddress(order.tokenAddress)}</p>
          </div>

          <div className='flex flex-row gap-5'>
            <span className="font-medium">Amount:</span>
            <p>{order.amount}</p>
          </div>

          <div className='flex flex-row gap-5'>
            <span className="font-medium">Limit MC:</span>
            <p>{formatNumberAbbreviation(order.limitMC.toString())}</p>
          </div>

          <div className='flex flex-row gap-5'>
            <span className="font-medium">Limit Time:</span>
            <p>{limitTimeFormatted}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
