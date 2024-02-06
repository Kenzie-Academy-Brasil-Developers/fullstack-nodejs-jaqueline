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
  verifyContactExists,
  verifyPermissionsContacts
} from "../middlewares/contacts.middleware";
import {
  verifyToken,
} from "../middlewares/globals.middleware";
import { verifyUserExistsToContact } from "../middlewares/clients.middleware";

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
  verifyUserExistsToContact,
  validateBodyContact(updateContactSchema),
  verifyToken,
  verifyPermissionsContacts,
  updateContactController
);
contactRouter.delete(
  "/:id/client/:clientId",
  verifyContactExists,
  verifyUserExistsToContact,
  verifyToken,
  verifyPermissionsContacts,
  deleteContactController
);
