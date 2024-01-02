import express, { urlencoded } from "express";
import { ENV_CONFIG } from "./utils/env/env-config.js";
import { connectDB } from "./db/connection.js";
import routes from "./api/routes/index.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(routes);

app.listen(ENV_CONFIG.PORT, () =>
  console.log(`Server is up and running at PORT: ${ENV_CONFIG.PORT}`)
);
