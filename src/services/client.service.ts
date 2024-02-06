import { hash } from "bcryptjs";
import Client from "../entities/Client.entity";
import Contact from "../entities/Contact.entity";
import {
  ClientCreate,
  ClientReturn,
  ClientUpdate,
} from "../interfaces/clients.interface";
import { clientRepo, contactRepo } from "../repositories";
import { clientReturnSchema } from "../schemas/clients.schema";

export const createClientService = async (
  data: ClientCreate
): Promise<ClientReturn> => {
  const user: Client = clientRepo.create(data);

  await clientRepo.save(user);


  return clientReturnSchema.parse(user);
};

export const readAllClientsService = async () => {
  const users = await clientRepo.find({
    withDeleted: true,
  });

  const data = {
    clients: users,
  };

  return data;
};

export const updateClientService = async (
  data: ClientUpdate,
  user: Client
): Promise<ClientReturn> => {
  const userUpdate: Client = clientRepo.create({ ...user, ...data });

  const clientUpdate = await clientRepo.save(userUpdate);

  return clientUpdate;
};

export const deleteClientService = async (user: Client): Promise<void> => {
  await clientRepo.remove(user);
};

export const readAllContactsFromClientService = async (clientId:any) => {
  const client: ClientReturn | null = await clientRepo.findOneBy({
    id: Number(clientId),
  });
  const contacts: Contact[] = await contactRepo.find({
    where: { clientId: Number(clientId) },
  });

  const data = {
    client: client,
    contacts: contacts,
  };
  return data;
};
