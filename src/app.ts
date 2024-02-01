import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { routes } from "./routers/index.routes";
import { handleErrors } from "./middlewares/handleErrors.middleware";

export const app = express();

const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use("/", routes);

app.use(handleErrors);

export default app;
