import Client from "./entities/Client.entity";
import { AppDataSource } from "./dataSource";
import { ClientRepo } from "./interfaces/clients.interface";
import { ContactRepo } from "./interfaces/contacts.interface";
import Contact from "./entities/Contact.entity";

export const contactRepo: ContactRepo = AppDataSource.getRepository(Contact);
export const clientRepo: ClientRepo = AppDataSource.getRepository(Client);
