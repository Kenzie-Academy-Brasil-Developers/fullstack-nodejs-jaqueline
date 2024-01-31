import { Router } from "express";
import { createClientSchema, updateClientSchema } from "../schemas/clients.schema";
import { validateBody, verifyAdmin, verifyPermissions, verifyToken } from "../middlewares/globals.middleware";
import { verifyUniqueUserEmail, verifyUserExists } from "../middlewares/clients.middleware";
import { createClientController, deleteClientController, readAllClientsController, updateClientController } from "../controllers/client.controlle";


export const clientRouter: Router = Router()

clientRouter.post('/', validateBody(createClientSchema), verifyUniqueUserEmail, createClientController)
clientRouter.get('/', verifyToken, verifyAdmin, readAllClientsController)
clientRouter.patch('/:id', verifyUserExists, validateBody(updateClientSchema), verifyToken, verifyPermissions, updateClientController)
clientRouter.delete('/:id', verifyUserExists, verifyToken, verifyAdmin, deleteClientController)