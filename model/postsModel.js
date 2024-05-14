
const pool = require('../DB');
async function getPost(id) {
  try {
    const sql = 'SELECT * FROM posts where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getPosts(id) {
  try {
    const sql = 'SELECT id,title FROM posts where user_id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function createPost(userId,title,body) {
  try {
    const sql = `INSERT INTO posts (user_id,title,body) values('${userId}','${title}','${body}')`;
    const result = await pool.query(sql);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function updatePost(id,userId,title,body) {
  try {
    const sql = `UPDATE posts SET user_id = ?,title = ?,body = ? WHERE id = ?`;
    const result = await pool.query(sql, [userId,title,body,id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function deletePost(id) {
  try {
    const sql1 = 'DELETE FROM comments where post_id=?';
    const result1 = await pool.query(sql1, [id]);
    const sql = 'DELETE FROM posts where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getPost,getPosts, createPost, updatePost, deletePost }
