import { db } from "@/app/_lib/prisma"
import dayjs from "dayjs"

export interface DayTotalRevenue {
    day: string
    totalRevenue: number
}

interface DashboardDto {
    totalRevenue: number
    todayRevenue: number
    totalSales: number
    totalProducts: number
    totalLast30DaysRevenue: DayTotalRevenue[]
}

export const getDashboard = async (): Promise<DashboardDto> => {

    const today = dayjs().endOf("day").toDate()

    const last30Day = [29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) => {
        return dayjs(today).subtract(day, "day")
    })

    const totalLast30DaysRevenue: DayTotalRevenue[] = []
    for (const day of last30Day) {
        const dayTotalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(
            `
        SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
        FROM "SaleProduct"
        WHERE "createdAt" > $1 AND "createdAt" < $2
        `,
            day.startOf("day").toDate(),
            day.endOf("day").toDate()
        )

        totalLast30DaysRevenue.push({
            day: day.format("DD/MM"),
            totalRevenue: dayTotalRevenue[0].totalRevenue
        })
    }


    const totalRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
     FROM "SaleProduct"
    `

    const todayRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "todayRevenue"
     FROM "SaleProduct"
     WHERE "createdAt" > $1 AND "createdAt" < $2
    `

    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

    const totalRevenuePromise = db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)
    const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery, startOfDay, endOfDay)

    const totalSalesPromise = db.sale.count()

    const totalProductsPromise = db.product.count()

    const [totalRevenue, todayRevenue, totalSales, totalProducts] = await Promise.all([
        totalRevenuePromise,
        todayRevenuePromise,
        totalSalesPromise,
        totalProductsPromise
    ])

    return {
        totalRevenue: Number(totalRevenue[0].totalRevenue),
        todayRevenue: Number(todayRevenue[0].todayRevenue),
        totalSales,
        totalProducts,
        totalLast30DaysRevenue
    }
}