import { http, HttpResponse } from 'msw'
import type { GetDailyRevenueResponse } from '../get-daily-revenue'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '01/01/2024',
      receipt: 2000,
    },
    {
      date: '02/01/2024',
      receipt: 2000,
    },
    {
      date: '03/01/2024',
      receipt: 2000,
    },
    {
      date: '04/01/2024',
      receipt: 2000,
    },
  ])
})
