require('dotenv').config()
const { Client } = require('pg');

const SQL = `
DROP TABLE users, messages;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN
  );

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message_text TEXT,
    message_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();