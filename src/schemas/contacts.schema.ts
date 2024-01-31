import { z } from 'zod'

const contactSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(120),
    email: z.string().email().max(45),
    telephone: z.number(),
    createdAt: z.string(),
})

export const createContactSchema = contactSchema.omit({ id: true, createdAt: true })
export const readAllContactsSchema = contactSchema.array()
export const updateContactSchema = createContactSchema.partial()
