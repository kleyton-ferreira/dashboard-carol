"use server"

import { db } from "@/app/_lib/prisma";
import { CreateSaleSchema, createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const CreateSale = async (data: CreateSaleSchema) => {
    createSaleSchema.parse(data)
    const sale = await db.sale.create({
        data: {
            date: new Date()
        }
    })

    for (const product of data.products) {

        const unitPrice = (
            await db.product.findUnique({
                where: {
                    id: product.id
                }
            })
        )?.price

        if (!unitPrice) {
            throw new Error("Product not found")
        }

        await db.saleProduct.create({
            data: {
                saleId: sale.id,
                productId: product.id,
                quantity: product.quantity,
                unitPrice
            }
        })
    }
    revalidatePath("/sales")
}