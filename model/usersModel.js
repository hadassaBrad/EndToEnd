const pool = require('../DB');
async function getUser(email) {
  try {
    const sql = 'SELECT * FROM users NATURAL JOIN addresses NATURAL JOIN passwords WHERE users.email = ?';
    const result = await pool.query(sql, [email]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getUserByEmail(email) {
  try {
    const sql = 'SELECT * FROM users where email=?';
    const result = await pool.query(sql, [email]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    const sql = `INSERT INTO users (lastName,firstName,email,phone) values('${lastName}','${firstName}','${email}','${phone}')`;
    const result = await pool.query(sql);
    createPassword(result[0].insertId, password);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function createPassword(id,password){
  const sql = `INSERT INTO passwords (user_id,password) values('${id}','${password}')`;
  const result = await pool.query(sql);
}  

async function createAddress(id, city, street) {
  const sql = `INSERT INTO addresses (user_id,city,street) values('${id}','${city}','${street}')`;
  const result = await pool.query(sql);
}

async function updateUser(id, lastName, firstName, email, phone, city, street, password) {
  try {
    const sql = `UPDATE users SET lastName = ?,firstName = ?,email = ?,phone = ? WHERE user_id = ?`;
    const result = await pool.query(sql, [lastName,firstName, email, phone, id]);
    createAddress(id, city, street);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getUser,getUserByEmail, createUser, updateUser }