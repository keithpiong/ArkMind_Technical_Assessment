import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,  
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: 0
});

// Testing connection (optional)
const testConnection = async () => {
  try {
    const [rows] = await connection.execute('SELECT 1');
    console.log('Connected to MySQL successfully');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
};

testConnection();

export default connection;
