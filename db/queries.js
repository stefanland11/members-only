const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT title, timestamp, m.id, message_content, username FROM messages m JOIN users u ON u.id = m.user_id");
  return rows;
}

async function deleteMessage(id) {
  const { rowCount } = await pool.query('DELETE FROM messages WHERE id = $1', [id]);
  return rowCount;
}

module.exports = {
  getAllMessages,
  deleteMessage
};
  