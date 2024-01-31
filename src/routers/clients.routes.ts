import { Router } from "express";
import {
  createClientSchema,
  updateClientSchema,
} from "../schemas/clients.schema";
import {
  verifyAdmin,
  verifyPermissions,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  validateBodyClient,
  verifyUniqueClientEmail,
  verifyUserExists,
} from "../middlewares/clients.middleware";
import {
  createClientController,
  deleteClientController,
  readAllClientsController,
  readAllContactsFromClientController,
  updateClientController,
} from "../controllers/client.controlle";

export const clientRouter: Router = Router();

clientRouter.post(
  "/",
  
  validateBodyClient(createClientSchema),
  verifyUniqueClientEmail,
  createClientController
);
clientRouter.patch(
  "/:id",
  verifyUserExists,
  validateBodyClient(updateClientSchema),
  verifyUniqueClientEmail,
  verifyToken,
  verifyPermissions,
  updateClientController
);
clientRouter.get("/", verifyToken, verifyAdmin, readAllClientsController);
clientRouter.delete(
  "/:id",
  verifyUserExists,
  verifyToken,
  verifyPermissions,
  deleteClientController
);
clientRouter.get(
  "/:id/contacts",
  verifyUserExists,
  verifyToken,
  verifyPermissions,
  readAllContactsFromClientController
);
