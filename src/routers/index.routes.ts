import { Router } from "express";
// import { userRouter } from "./users.router";
import { loginRouter } from "./login.routes";
import { clientRouter } from "./clients.routes";
// import { categoriesRouter } from "./categories.router";


export const routes: Router = Router()


routes.use('/clients', clientRouter)
routes.use('/login', loginRouter)
// routes.use('/contacts', categoriesRouter)
