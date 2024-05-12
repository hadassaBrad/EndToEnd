//מה צריך להחזיר בכל פונקציה ומה צריך לבדוק מבחינת 404
//כשמקבלים משתמש האם צריך לדעת גם את הכתובת והקוד
//האם אני צריכה להוסיף פה את השאילתה לקבל את כל המטלות ע"פ התז. של המשתמש
//אם מוחקים פוסט צריך למחוק את כל הערות עליו
const pool = require('../DB');
async function getPost(id) {
  try {
    const sql = 'SELECT * FROM posts where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function getPosts(id) {
  try {
    const sql = 'SELECT id,title FROM posts where user_id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function createPost(userId,title,body) {
  try {
    const sql = `INSERT INTO posts (user_id,title,body) values('${userId}','${title}','${body}')`;
    const result = await pool.query(sql);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(id,userId,title,body) {
  try {
    const sql = `UPDATE posts SET user_id = ?,title = ?,body = ? WHERE id = ?`;
    const result = await pool.query(sql, [userId,title,body,id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(id) {
  try {
    const sql = 'DELETE FROM posts where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPost,getPosts, createPost, updatePost, deletePost }
