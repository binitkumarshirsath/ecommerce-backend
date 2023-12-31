import express from "express";
import { ENV_CONFIG } from "./utils/env/env-config.js";
import { connectDB } from "./db/connection.js";

const app = express();
connectDB();

app.listen(ENV_CONFIG.PORT, () =>
  console.log(`Server is up and running at PORT: ${ENV_CONFIG.PORT}`)
);
