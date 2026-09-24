"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { createProductSchema } from "@/app/_actions/create-product/schema"
import { actionClient } from "@/app/_lib/safe-actions"

export const createdProducts = actionClient.schema(createProductSchema).action(async ({ parsedInput: { id, ...data } }) => {
    createProductSchema.parse(data)
    await db.product.upsert({
        where: { id: id ?? "" },
        update: data,
        create: data,
    })
    revalidatePath("/products")
})