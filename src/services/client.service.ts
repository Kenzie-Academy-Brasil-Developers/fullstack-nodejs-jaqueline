import Client from "../entities/Client.entity"
import { ClientCreate, ClientReadReturn, ClientReturn, ClientUpdate } from "../interfaces/clients.interface"
import { clientRepo } from "../repositories"
import { clientReturnSchema, readAllClientsSchema } from "../schemas/clients.schema"


export const createClientService = async (data: ClientCreate): Promise<ClientReturn> => {
    const user: Client = clientRepo.create(data)
  
    await clientRepo.save(user)
  
    return clientReturnSchema.parse(user)
  }

  export const readAllClientsService = async (): Promise<ClientReadReturn> => {
    const users: Client[] = await clientRepo.find()
  
    return readAllClientsSchema.parse(users)
  }

  export const updateClientService = async (data: ClientUpdate, user: Client): Promise<ClientReturn> => {
    const userUpdate: Client = clientRepo.create({...user, ...data})
  
    await clientRepo.save(userUpdate)
  
    return clientReturnSchema.parse(userUpdate)
  }

  export const deleteClientService = async (user: Client): Promise<void> => {
    await clientRepo.softRemove(user)
  }