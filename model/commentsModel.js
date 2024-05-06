//מה צריך להחזיר בכל פונקציה ומה צריך לבדוק מבחינת 404
//כשמקבלים משתמש האם צריך לדעת גם את הכתובת והקוד
//האם אני צריכה להוסיף פה את השאילתה לקבל את כל המטלות ע"פ התז. של המשתמש

const pool = require('../DB');
async function getComment(id) {
  try {
    const sql = 'SELECT * FROM comments where comment_id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function createComment(postId,name,email,body) {
  try {
    const sql = `INSERT INTO comments (post_id,name,email,body) values('${postId}','${name}','${email}','${body}')`;
    const result = await pool.query(sql);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(id,postId,name,email,body) {
  try {
    const sql = `UPDATE comments SET post_id = ?,name = ?,email = ?,body = ? WHERE comment_id = ?`;
    const result = await pool.query(sql, [postId,name,email,body,id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(id) {
  try {
    const sql = 'DELETE FROM comments where comment_id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getComment, createComment, updateComment, deleteComment }
