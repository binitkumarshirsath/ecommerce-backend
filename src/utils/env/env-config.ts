import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const ENV_CONFIG = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

export { ENV_CONFIG };
