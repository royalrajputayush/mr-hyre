import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

const isLocalDb = connectionString && (
  connectionString.includes("localhost") || 
  connectionString.includes("127.0.0.1") || 
  connectionString.includes("db") || 
  connectionString.includes("host.docker.internal")
);

const pool = new pg.Pool({ 
  connectionString,
  ssl: isLocalDb ? false : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
