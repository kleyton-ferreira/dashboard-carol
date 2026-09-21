"use server"

import { actionClient } from "@/app/_lib/safe-actions";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient.schema(deleteSaleSchema).action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
        const sale = await trx.sale.findUnique({
            where: {
                id
            }
        })
        if (!sale) return
        await trx.sale.delete({
            where: {
                id
            }
        })
    })

    revalidatePath("/products")
    revalidatePath("/sales")
    revalidatePath("/")
})