import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const { Pool } = pg;

// Exportamos una función que crea una conexión
export const connectDB = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: true,
      // Ajusta la ruta si tu 'ca.pem' está en otra carpeta
      ca: fs.readFileSync('./ca.pem').toString(), 
    },
  });
  return pool;
};
