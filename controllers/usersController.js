const model = require('../model/usersModel');

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    const result = model.getUserByEmail(email);
    if (result[0] != null){
      return;
    }
    else{
     const tt=model.createUser(lastName, firstName, email, phone, city, street, password);
     console.log(`fghfh${tt}`);
     return tt;
    }
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

module.exports = { getUser, getUserByEmail, createUser, updateUser, deleteUser }