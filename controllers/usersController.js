const model = require('../model/usersModel');

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
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

module.exports = { getUser, createUser, updateUser, deleteUser }