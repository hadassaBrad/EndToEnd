//מה צריך להחזיר בכל פונקציה ומה צריך לבדוק מבחינת 404
//כשמקבלים משתמש האם צריך לדעת גם את הכתובת והקוד
//האם אני צריכה להוסיף פה את השאילתה לקבל את כל המטלות ע"פ התז. של המשתמש

const pool = require('../DB');
async function getTodos(id) {
  try {
    const sql = 'SELECT * FROM todos where user_id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function createTodo(userId,title,completed) {
  try {
    const sql = `INSERT INTO todos (user_id,title,completed) values('${userId}','${title}','${completed}')`;
    const result = await pool.query(sql);
     return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function updateTodo(id,userId,title,completed) {
  try {
    const sql = `UPDATE todos SET user_id = ?,title = ?,completed = ? WHERE id = ?`;
    const result = await pool.query(sql, [userId,title,completed,id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(id) {
  try {
    const sql = 'DELETE FROM todos where id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }
