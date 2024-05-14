
const pool = require('../DB');
async function getComment(id) {
  try {
    const sql = 'SELECT * FROM comments where id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}
async function getComments(id) {
  try {
    const sql = 'SELECT * FROM comments where post_id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}


async function createComment(postId,name,email,body) {
  try {
    const sql = `INSERT INTO comments (post_id,name,email,body) values('${postId}','${name}','${email}','${body}')`;
    const result = await pool.query(sql);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function updateComment(id,postId,name,email,body) {
  try {
    const sql = `UPDATE comments SET post_id = ?,name = ?,email = ?,body = ? WHERE id = ?`;
    const result = await pool.query(sql, [postId,name,email,body,id]);
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteComment(id) {
  try {
    const sql = 'DELETE FROM comments where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {getComments, getComment, createComment, updateComment, deleteComment }
