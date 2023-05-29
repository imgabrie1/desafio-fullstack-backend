import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email().min(10).max(50),
    phone: z.string().min(8).max(11),
})

const returnContactSchema = contactSchema.extend({
    id: z.number(),
    createdAt: z.string(),
})

const contactUpdateSchema = contactSchema.partial()
const returnMultipleContactSchema = returnContactSchema.array()

export { contactSchema, returnContactSchema, contactUpdateSchema, returnMultipleContactSchema }