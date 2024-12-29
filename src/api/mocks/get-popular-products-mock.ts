import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza 1', amount: 2 },
    { product: 'Pizza 2', amount: 5 },
    { product: 'Pizza 3', amount: 1 },
    { product: 'Pizza 4', amount: 6 },
  ])
})
