import { api } from '@/lib/axios'

export interface GetDayOrdersAmount {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmount>(
    '/metrics/day-orders-amount'
  )

  return response.data
}
