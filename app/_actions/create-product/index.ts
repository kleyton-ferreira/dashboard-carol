"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { CreateProductSchema } from "@/app/_actions/create-product/schema"

export const createdProducts = async (data: CreateProductSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await db.product.upsert({
        where: { id: data.id ?? "" },
        update: data,
        create: data
    })

    revalidatePath("/products")
}