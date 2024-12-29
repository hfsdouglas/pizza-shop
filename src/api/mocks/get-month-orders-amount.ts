import { http, HttpResponse } from "msw"
import type { GetMonthOrdersAmount } from "../get-month-orders-amount"

export const getMonthOrdersAmountMock = http.get<never, never, GetMonthOrdersAmount>('/metrics/month-orders-amount', () => {
    return HttpResponse.json({
        amount: 20, 
        diffFromLastMonth: -5
    })
})