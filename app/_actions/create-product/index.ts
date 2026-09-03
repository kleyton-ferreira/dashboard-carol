"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { CreateProductSchema } from "@/app/_actions/create-product/schema"

export const createdProducts = async (data: CreateProductSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await db.product.create({
        data
    })

    revalidatePath("/products")
}