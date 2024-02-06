import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import Contact from "../entities/Contact.entity";
import { contactSchema, createContactSchema, readAllContactsSchema } from "../schemas/contacts.schema";

export type CreateContact = z.infer<typeof createContactSchema>
export type ReadAllContacts = z.infer<typeof readAllContactsSchema>
export type ContactBodyUpdate = Omit<CreateContact, "createdAt" | "deletedAt" | "clientId" >
export type ContactUpdate = DeepPartial<ContactBodyUpdate>
export type ContactReturn = z.infer<typeof contactSchema>
export type ContactRepo = Repository<Contact>