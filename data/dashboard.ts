import 'server-only'
import { db } from '@/db'
import { cache } from 'react'
import { getUser } from './auth'
import { OrderType } from '@/db/types'
import { formatPrice } from '@/lib/utils'

type ChartData = {
  key: string
  Revenue: number
}[]
type TimePeriodTab = 'weekly' | 'monthly' | 'yearly'

function transformOrdersToChartData(
  orders: OrderType[],
  timePeriodTab: TimePeriodTab
): ChartData {
  const getUTCDate = (dateString: string) => {
    const d = new Date(dateString)
    return new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    )
  }

  const processMonthly = () => {
    const currentDate = new Date()
    const months = []

    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() - i, 1)
      )
      months.push({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth()
      })
    }

    const monthIndices = new Map()
    months.forEach(({ year, month }, index) => {
      monthIndices.set(`${year}-${month}`, index)
    })
    const revenue: number[] = new Array(12).fill(0)

    orders.forEach(order => {
      const orderDate = new Date(order.order_created_at)
      const year = orderDate.getUTCFullYear()
      const month = orderDate.getUTCMonth()
      const index = monthIndices.get(`${year}-${month}`)

      if (index !== undefined)
        revenue[index] += Number(formatPrice(order.total_amount))
    })

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    return months.map(({ month }, index) => ({
      key: monthNames[month],
      Revenue: revenue[index]
    }))
  }

  const processWeekly = () => {
    const currentDate = new Date()
    const days: Date[] = []

    const currentUTCDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    )

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentUTCDate)
      date.setUTCDate(date.getUTCDate() - i)
      days.push(date)
    }

    const dayIndices = new Map()
    days.forEach((date, index) => {
      const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
      dayIndices.set(key, index)
    })
    const revenue: number[] = new Array(7).fill(0)

    orders.forEach(order => {
      const orderDate = new Date(order.order_created_at)
      const key = `${orderDate.getUTCFullYear()}-${orderDate.getUTCMonth()}-${orderDate.getUTCDate()}`
      const index = dayIndices.get(key)

      if (index !== undefined)
        revenue[index] += Number(formatPrice(order.total_amount))
    })

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    return days.map(date => ({
      key: dayNames[date.getUTCDay()],
      Revenue: revenue[days.indexOf(date)]
    }))
  }

  const processYearly = () => {
    const yearMap = new Map<number, number>()

    orders.forEach(order => {
      const year = getUTCDate(order.order_created_at).getUTCFullYear()
      yearMap.set(
        year,
        (yearMap.get(year) || 0) + Number(formatPrice(order.total_amount))
      )
    })

    return Array.from(yearMap.keys())
      .sort((a, b) => a - b)
      .map(year => ({
        key: year.toString(),
        Revenue: yearMap.get(year) || 0
      }))
  }

  switch (timePeriodTab.toLowerCase()) {
    case 'monthly':
      return processMonthly()
    case 'weekly':
      return processWeekly()
    case 'yearly':
      return processYearly()
    default:
      throw new Error(
        'Invalid time period. Use "monthly", "weekly", or "yearly".'
      )
  }
}

export const getDashboardStats = cache(async () => {
  if (!getUser()) throw new Error('Unauthorized access.')

  const productsInStock = await db.query.productVariations.findMany({
    where: (field, { gte }) => gte(field.stock, 1)
  })
  const orders = await db.query.order.findMany({
    orderBy: (field, op) => op.desc(field.order_created_at)
  })

  const chartData: Record<TimePeriodTab, ChartData> = {
    weekly: transformOrdersToChartData(orders, 'weekly'),
    monthly: transformOrdersToChartData(orders, 'monthly'),
    yearly: transformOrdersToChartData(orders, 'yearly')
  }

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.total_amount,
    0
  )

  return {
    productsInStock: productsInStock.length,
    totalRevenue,
    orders,
    chartData
  }
})
