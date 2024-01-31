import { Request, Response } from "express";
import { ClientReturn } from "../interfaces/clients.interface";
import { createClientService, deleteClientService, readAllClientsService, updateClientService } from "../services/client.service";


export const createClientController = async (req: Request, res: Response): Promise<Response> => {
    const user: ClientReturn = await createClientService(req.body)
  
    return res.status(201).json(user)
  }

  export const readAllClientsController = async (req: Request, res: Response): Promise<Response> => {
    const users = await readAllClientsService()
    return res.status(200).json(users)
  }

  export const updateClientController = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals
    const newClient = await updateClientService(req.body, user)
    return res.status(200).json(newClient)
  }

  export const deleteClientController = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals


    await deleteClientService(user)
    return res.status(204).json()
  }