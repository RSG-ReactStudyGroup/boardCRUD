const db = require("../db/connection");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
  return rows[0];
};

exports.create = async (title, content, writer, password) => {
  await db.query(
    "INSERT INTO posts (title, content, writer, password, created_at) VALUES (?, ?, ?, ?, NOW())",
    [title, content, writer, password]
  );
};

exports.update = async (id, title, content, password) => {
  await db.query(
    "UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND password = ?",
    [title, content, id, password]
  );
};

exports.remove = async (id, password) => {
  await db.query("DELETE FROM posts WHERE id = ? AND password = ?", [
    id,
    password,
  ]);
};
