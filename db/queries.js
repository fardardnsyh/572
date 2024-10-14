const pool = require("./pool");

async function getAllMessages() {
  const SQL = `
    SELECT 
      messages.message_id, 
      users.user_name, 
      messages.message_text,
      messages.message_date 
    FROM
      messages
    INNER JOIN 
      users 
    ON 
      messages.user_id = users.user_id
    ORDER BY 
      messages.message_id ASC;
  `;
  const result = await pool.query(SQL);
  const messages = result.rows;
  return messages;
};

async function insertNewUser(user_name, hashedPassword, isAdmin) {
  await pool.query("INSERT INTO users (user_name, user_password, isAdmin) VALUES ($1, $2, $3)", [user_name, hashedPassword, isAdmin]);
  const newUser = getUserByUsername(user_name);
  return newUser;
}

async function getUserByID(id) {
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE user_name = $1';
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

async function insertMessage(user_id, message_text) {
  const query = 'INSERT INTO messages (user_id, message_text) VALUES ($1, $2)';
  await pool.query(query, [ user_id, message_text ]);
}

async function deleteMessage(message_id) {
  const query = 'DELETE FROM messages WHERE message_id = $1'
  await pool.query(query, [ message_id ]);
}

module.exports = {
  getAllMessages,
  insertNewUser,
  getUserByID,
  getUserByUsername,
  insertMessage,
  deleteMessage
};
