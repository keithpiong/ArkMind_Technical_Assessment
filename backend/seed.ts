const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,  
});

// Sample data to insert into the items table
const items = [
  { name: 'Sample Item 1', price: 19.99, description: 'Description of item 1' },
  { name: 'Sample Item 2', price: 25.50, description: 'Description of item 2' },
  { name: 'Sample Item 3', price: 30.00, description: 'Description of item 3' }
];

// Function to insert data into the table
const seedDatabase = () => {
  const query = 'INSERT INTO items (name, price, description) VALUES ?';

  const values = items.map(item => [item.name, item.price, item.description]);

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error seeding the database:', err);
      connection.end();
      return;
    }

    console.log(`Successfully inserted ${results.affectedRows} rows.`);
    connection.end();
  });
};

// Run the seed function
seedDatabase();
