import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_HOSTNAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DBNAME,
} = process.env;

export default {
  DATABASE_HOSTNAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DBNAME,
}