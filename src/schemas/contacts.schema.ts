import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(120),
  email: z.string().email().max(45),
  telephone: z.string(),
  createdAt: z.string(),
  deletedAt: z.string().nullable(),
  clientId: z.number().positive().int(),
});

export const createContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
});
export const readAllContactsSchema = contactSchema.array();
export const updateContactSchema = createContactSchema.partial();
