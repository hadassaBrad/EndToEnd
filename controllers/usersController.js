const model = require('../model/usersModel');

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    const result = await model.getUserByEmail(email);
    console.log("uhuh",result.length);
  if(result.length!=0){
    throw err;
  }
    return model.createUser(lastName, firstName, email, phone, city, street, password);

  } catch (err) {
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
async function deleteUser(id) {
  try {
    return model.deleteUser(id);
  } catch (err) {
    throw err;
  }
}

async function postLogin(email, password) {
  try {
    const result = await model.getUser(email);
    if (result != null) {
      if (result.password == password)
        return result;
      else
        throw err;
    }

  } catch (err) {
    throw err;
  }
}
module.exports = { postLogin, getUser, getUserByEmail, createUser, updateUser, deleteUser }