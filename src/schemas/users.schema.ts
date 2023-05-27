import { z } from "zod"

const userSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().min(3).max(45),
    phone: z.string().min(8),
    password: z.string().min(8).max(20)
})

const returnUserSchema = userSchema
    .extend({
        id: z.number(),
        createdAt: z.string(),
    })
    .omit({ password: true })

const clientUpdateSchema = userSchema.partial()
const returnMultipleUsersSchema = returnUserSchema.array()

export { userSchema, returnUserSchema, clientUpdateSchema, returnMultipleUsersSchema }