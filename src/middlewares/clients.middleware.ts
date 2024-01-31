import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppErrors.error"
import { clientRepo } from "../repositories"
import Client from "../entities/Client.entity"


export const verifyUniqueUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email} = req.body
    const client: Client | null = await clientRepo.findOneBy({email})
  
    if(client) throw new AppError('Email already exists', 409)
  
    return next()
  }

  export const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const user: Client | null = await clientRepo.findOneBy({id: Number(id)})
  
    if(!user) throw new AppError('User not found', 404)
  
    res.locals = {...res.locals, user}
  
    return next()
  }