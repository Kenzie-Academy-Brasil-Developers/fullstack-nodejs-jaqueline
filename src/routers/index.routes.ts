import { Router } from "express";
import { loginRouter } from "./login.routes";
import { clientRouter } from "./clients.routes";
import { contactRouter } from "./contacts.routes";

export const routes: Router = Router();

routes.use("/clients", clientRouter);
routes.use("/contacts", contactRouter);
routes.use("/login", loginRouter);
