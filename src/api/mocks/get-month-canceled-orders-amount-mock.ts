import { http, HttpResponse } from "msw"
import type { GetMonthCanceledOrdersAmount } from "../get-month-canceled-orders-amount"

export const getMonthCanceledOrdersAmountMock = http.get<never, never, GetMonthCanceledOrdersAmount>('/metrics/month-canceled-orders-amount', () => {
    return HttpResponse.json({
        amount: 5, 
        diffFromLastMonth: -5
    })
})