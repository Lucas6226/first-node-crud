import express from "express";
import router from "./router";
import { errorHandler } from "./error/errorHandler"

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler)

export default app;
