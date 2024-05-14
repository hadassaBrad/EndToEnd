const model = require('../model/usersModel');
const bcrypt = require("bcrypt")
const numSaltRoundss = 10;
async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    const result = await model.getUserByEmail(email);
    if (result.length != 0) {
      throw err;
    }
    const hash = await bcrypt.hash(password, numSaltRoundss);
    return model.createUser(lastName, firstName, email, phone, city, street, hash);
  } catch (err) {
    throw err;
  }
}
async function postLogin(email, password) {
  try {
    const result = await model.getUser(email);
    if (result.length == 0) {
      throw new Error("not Exsist");
    }
    const tablePassword = result[0].password;
    if (!(await bcrypt.compare(password, tablePassword))) {
      throw new Error("not valid password");
    }
    else {
      return result[0];
    }
  }
  catch (err) {
    throw err;
  }
}
async function getUser(id) {
  try {
    return model.getUser(id);
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    return model.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
}

async function updateUser(id, lastName, firstName, email, phone, city, street, password) {
  try {
    return model.updateUser(id, lastName, firstName, email, phone, city, street, password);
  } catch (err) {
    throw err;
  }
}

module.exports = { postLogin, getUser, getUserByEmail, createUser, updateUser }