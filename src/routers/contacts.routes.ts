import { Router } from "express";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contacts.schema";
import {
  createContactController,
  deleteContactController,
  readAllContactsController,
  updateContactController,
} from "../controllers/contact.controller";
import {
  validateBodyContact,
  verifyBodyClientExists,
  verifyContactExists,
  verifyUniqueContactEmail,
} from "../middlewares/contacts.middleware";
import {
  verifyAdmin,
  verifyPermissions,
  verifyPermissionsPatch,
  verifyToken,
} from "../middlewares/globals.middleware";

export const contactRouter: Router = Router();

contactRouter.post(
  "/",
  validateBodyContact(createContactSchema),
  createContactController
);
contactRouter.get("/", readAllContactsController);
contactRouter.patch(
  "/:id/client/:clientId",
  verifyContactExists,
  verifyBodyClientExists,
  validateBodyContact(updateContactSchema),
  verifyToken,
  verifyPermissionsPatch,
  updateContactController
);
contactRouter.delete(
  "/:id",
  verifyContactExists,
  verifyToken,
  verifyPermissions,
  deleteContactController
);
