
const pool = require('../DB');
async function getTodos(id) {
  try {
    const sql = 'SELECT * FROM todos where user_id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function createTodo(userId,title,completed) {
  try {
    const sql = `INSERT INTO todos (user_id,title,completed) values('${userId}','${title}','${completed}')`;
    const result = await pool.query(sql);
     return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function updateTodo(id,userId,title,completed) {
  try {
    const sql = `UPDATE todos SET user_id = ?,title = ?,completed = ? WHERE id = ?`;
    const result = await pool.query(sql, [userId,title,completed,id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteTodo(id) {
  try {
    const sql = 'DELETE FROM todos where id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }
