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
  "/:id",
  verifyContactExists,
  verifyBodyClientExists,
  validateBodyContact(updateContactSchema),
  verifyToken,
  verifyPermissions,
  updateContactController
);
contactRouter.delete(
  "/:id",
  verifyContactExists,
  verifyToken,
  verifyPermissions,
  deleteContactController
);
