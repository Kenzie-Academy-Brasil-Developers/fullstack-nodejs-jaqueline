import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { validateBodyContact } from "../middlewares/contacts.middleware";
import { clientLoginSchema } from "../schemas/clients.schema";

export const loginRouter: Router = Router();

loginRouter.post("/", validateBodyContact(clientLoginSchema), loginController);
