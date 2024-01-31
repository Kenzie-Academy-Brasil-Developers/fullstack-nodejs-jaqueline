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
  verifyClientExistsInBody,
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
  verifyUniqueContactEmail,
  validateBodyContact(createContactSchema),
  createContactController
);
contactRouter.get("/", verifyToken, verifyAdmin, readAllContactsController);
contactRouter.patch(
  "/:id",
  verifyContactExists,
  verifyClientExistsInBody,
  verifyBodyClientExists,
  verifyUniqueContactEmail,
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
