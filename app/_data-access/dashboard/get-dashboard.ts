import "server-only"

import { db } from "@/app/_lib/prisma"
import dayjs from "dayjs"
import { ProductStatus } from "./get-status"

export interface DayTotalRevenue {
    day: string
    totalRevenue: number
}

export interface MostSoldProductDto {
    productId: string
    name: string
    nameClient: string
    totalRevenue: number
    status: ProductStatus
    price: number
}

interface DashboardDto {
    totalRevenue: number
    todayRevenue: number
    totalSales: number
    totalProducts: number
    totalLast30DaysRevenue: DayTotalRevenue[]
    mostSoldProducts: MostSoldProductDto[]
}

export const getDashboard = async (): Promise<DashboardDto> => {
    const today = dayjs().endOf("day").toDate()

    const last30Day = Array.from({ length: 30 }, (_, i) =>
        dayjs(today).subtract(i, "day")
    )

    // Todas as queries em paralelo
    const [
        totalRevenueData,
        todayRevenueData,
        totalSales,
        totalProducts,
        mostSoldProductsData,
        last30DaysData
    ] = await Promise.all([
        db.$queryRawUnsafe<{ totalRevenue: number }[]>(
            `SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
             FROM "SaleProduct"
             JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"`
        ),
        db.$queryRawUnsafe<{ todayRevenue: number }[]>(
            `SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "todayRevenue"
             FROM "SaleProduct"
             JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
             WHERE "Sale"."date" > $1 AND "Sale"."date" < $2`,
            dayjs().startOf("day").toDate(),
            dayjs().endOf("day").toDate()
        ),
        db.sale.count(),
        db.product.count(),
        db.$queryRawUnsafe<{ productId: string; name: string; nameClient: string; totalSold: number; stock: number; price: number }[]>(
            `SELECT "Product"."name", "Product"."nameClient", SUM("SaleProduct"."quantity") as "totalSold", 
                    "Product"."price", "Product"."stock", "Product"."id" as "productId"
             FROM "SaleProduct"
             JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
             GROUP BY "Product"."name", "Product"."nameClient", "Product"."price", "Product"."stock", "Product"."id"
             ORDER BY "totalSold" DESC
             LIMIT 5`
        ),
        Promise.all(
            last30Day.map((day) =>
                db.$queryRawUnsafe<{ totalRevenue: number }[]>(
                    `SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
                     FROM "SaleProduct"
                     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
                     WHERE "Sale"."date" > $1 AND "Sale"."date" < $2`,
                    day.startOf("day").toDate(),
                    day.endOf("day").toDate()
                ).then((result) => ({
                    day: day.format("DD/MM"),
                    totalRevenue: Number(result[0].totalRevenue) // 🔧 CORRIGIDO: Converter Decimal para number
                }))
            )
        )
    ])

    return {
        totalRevenue: Number(totalRevenueData[0].totalRevenue),
        todayRevenue: Number(todayRevenueData[0].todayRevenue),
        totalSales,
        totalProducts,
        totalLast30DaysRevenue: last30DaysData, // ✅ Agora com plain objects
        mostSoldProducts: mostSoldProductsData.map((prod) => ({
            productId: prod.productId,
            name: prod.name,
            nameClient: prod.nameClient,
            price: Number(prod.price),
            totalRevenue: Number(prod.totalSold),
            status: prod.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"
        }))
    }
}