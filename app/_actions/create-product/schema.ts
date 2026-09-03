import z from "zod";

export const createProductSchema = z.object({
    nameClient: z.string().trim().min(1, {
        message: "O nome da cliente é obrigatório.",
    }),
    name: z.string().trim().min(1, {
        message: "O serviço é obrigatório",
    }),

    price: z.number().min(0.01, {
        message: "O valor do serviço é obrigatório",
    }),

    stock: z.number().min(0, {
        message: "A quantidade de procedimento deve ser positiva.",
    }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>