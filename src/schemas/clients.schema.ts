import { z } from 'zod'

const clientSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(120),
    email: z.string().email().max(45),
    password: z.string().max(120),
    telephone: z.number(),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    deletedAt: z.string().nullable()
})

export const createClientSchema = clientSchema.omit({ id: true, createdAt: true, deletedAt: true })
export const clientWithoutAdmin = createClientSchema.omit({admin: true })
export const clientReturnSchema = clientSchema.omit({password: true})
export const readAllClientsSchema = clientReturnSchema.array()
export const updateClientSchema = clientWithoutAdmin.partial()
export const clientLoginSchema = clientSchema.pick({
    email: true,
    password: true
  })