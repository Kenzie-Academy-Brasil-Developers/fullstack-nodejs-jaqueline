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

  validateBodyClientPatch,

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
  validateBodyClientPatch(updateClientSchema),
  verifyUniqueClientEmail,
  verifyToken,
  verifyPermissions,
  updateClientController
);
clientRouter.get("/", readAllClientsController);
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
