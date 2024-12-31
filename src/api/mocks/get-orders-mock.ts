import { http, HttpResponse } from 'msw'
import type { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']
type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
]

const orders: Orders = Array.from({ length: 69 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % 5],
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
      ? searchParams.get('customerName')
      : 0

    const orderId = searchParams.get('orderId')
      ? searchParams.get('orderId')
      : 0

    const status = searchParams.get('status') ? searchParams.get('status') : 0

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter(order =>
        order.customerName.includes(customerName)
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter(order =>
        order.orderId.includes(orderId)
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  }
)
