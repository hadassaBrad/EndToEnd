//מה צריך להחזיר בכל פונקציה ומה צריך לבדוק מבחינת 404
//כשמקבלים משתמש האם צריך לדעת גם את הכתובת והקוד

const pool = require('../DB');
async function getUser(email) {
  try {
    //const sql = 'SELECT * FROM users where user_id=? natural join adresses';
    const sql = 'SELECT * FROM users NATURAL JOIN addresses NATURAL JOIN passwords WHERE users.email = ?';
    const result = await pool.query(sql, [email]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmail(email) {
  try {
    const sql = 'SELECT * FROM users where email=?';
    const result = await pool.query(sql, [email]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    console.log("password in model",password);
    const sql = `INSERT INTO users (lastName,firstName,email,phone) values('${lastName}','${firstName}','${email}','${phone}')`;
    const result = await pool.query(sql);
    createAddress(result[0].insertId, city, street);
    createPassword(result[0].insertId, password);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function createPassword(id,password){
  console.log("password in create password",password," the id: ",id);
  const sql = `INSERT INTO passwords (user_id,password) values('${id}','${password}')`;
  const result = await pool.query(sql);
}  

async function createAddress(id, city, street) {
  const sql = `INSERT INTO addresses (user_id,city,street) values('${id}','${city}','${street}')`;
  const result = await pool.query(sql);
}

async function updateUser(id, lastName, firstName, email, phone, city, street, password) {
  try {
    console.log(firstName,password,city,id);
    const sql = `UPDATE users SET lastName = ?,firstName = ?,email = ?,phone = ? WHERE user_id = ?`;
    const result = await pool.query(sql, [lastName,firstName, email, phone, id]);
    updateAddress(id, city, street);
    updatePassword(id, password);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function updatePassword(id,password){
  const sql = `UPDATE passwords SET password = ? WHERE user_id = ?`;
  const result = await pool.query(sql, [password,id]);
}  

async function updateAddress(id, city, street) {
  const sql = `UPDATE addresses SET city = ?, street = ? WHERE user_id = ?`;
  const result = await pool.query(sql, [city,street,id]);
}

async function deleteUser(id) {
  try {
    deletePassword(id);
    deleteAddress(id);
    const sql = 'DELETE FROM users where user_id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function deletePassword(id){
  const sql = 'DELETE FROM passwords where user_id=?';
  const result = await pool.query(sql, [id]);
}  

async function deleteAddress(id) {
  const sql = 'DELETE FROM addresses where user_id=?';
  const result = await pool.query(sql, [id]);
}

module.exports = { getUser,getUserByEmail, createUser, updateUser, deleteUser }
