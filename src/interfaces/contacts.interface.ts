import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import Contact from "../entities/Contact.entity";
import { createContactSchema, readAllContactsSchema, updateContactSchema } from "../schemas/contacts.schema";

export type CreateCategory = z.infer<typeof createContactSchema>
export type ReadAllContacts = z.infer<typeof readAllContactsSchema>
export type ContactUpdate = DeepPartial<typeof updateContactSchema>
export type ContactRepo = Repository<Contact>