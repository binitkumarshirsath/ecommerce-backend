import mongoose from "mongoose";
import { ENV_CONFIG } from "../utils/env/env-config.js";

const connectDB = () => {
  const DB_URL = ENV_CONFIG.DB_URL;
  if (!DB_URL) {
    console.error("DB_URL missing.");
    process.exit(1);
  }

  mongoose
    .connect(DB_URL, {
      dbName: "Ecommerce",
    })
    .then(() => console.log(`DB connected successfully!`))
    .catch((e) => {
      console.error("Error while connecting to DB", e);
      process.exit(1);
    });
};

export { connectDB };
