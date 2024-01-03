import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const environment = process.env.NODE_ENV;

console.log(
  `Environment variable loaded || [Current environment ===> ${environment}]`
);
const ENV_CONFIG = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};

export { ENV_CONFIG };
