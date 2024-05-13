const model = require('../model/usersModel');

async function createUser(lastName, firstName, email, phone, city, street, password) {
  try {
    const result = await model.getUserByEmail(email);
    if (result.length != 0) {
      throw err;
    }
    return model.createUser(lastName, firstName, email, phone, city, street, password);

  } catch (err) {
    throw err;
  }
}
async function postLogin(email, password) {
  try {
    const result = await model.getUser(email);
    if (result.length != 0) {
      let error = new Error("not Exsist");
      throw error.message;
    }
    if (result.password != password) {
      let error = new Error("not valid password");
      throw error.message;
    }
    else
      return result;

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
async function deleteUser(id) {
  try {
    return model.deleteUser(id);
  } catch (err) {
    throw err;
  }
}


module.exports = { postLogin, getUser, getUserByEmail, createUser, updateUser, deleteUser }