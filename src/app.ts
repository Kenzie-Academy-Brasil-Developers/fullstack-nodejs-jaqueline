import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { routes } from "./routers/index.routes";

export const app = express();
app.use(express.json());

app.use("/", routes);

app.use(handleErrors);

export default app;
