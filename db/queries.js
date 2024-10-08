const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT title, timestamp, message_content, username FROM messages m JOIN users u ON u.id = m.user_id");
  return rows;
}

module.exports = {
  getAllMessages,
};
  