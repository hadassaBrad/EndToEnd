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
    console.log("hash", hash);
  return  model.createUser(lastName, firstName, email, phone, city, street, hash);
    
    // bcrypt
    //   .genSalt(saltRounds)
    //   .then(salt => {
    //     console.log('Salt: ', salt)
    //     const hashPassword= bcrypt.hash(password, salt)
    //     return model.createUser(lastName, firstName, email, phone, city, street, hashPassword);
    //   })
    //   .then(hash => {
    //     console.log('Hash: ', hash)
    //   })
    //   .catch(err => console.error(err.message))


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
    const hash =  await bcrypt.hash(password, numSaltRoundss);
      const tablePassword = result[0].password;
      console.log("new hash",hash);
    console.log("password from table",tablePassword);
    if (await bcrypt.compare(tablePassword, hash))
      // if (result[0].password != password) 
    {
        console.log(password, result[0].password)
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
async function deleteUser(id) {
  try {
    return model.deleteUser(id);
  } catch (err) {
    throw err;
  }
}


module.exports = { postLogin, getUser, getUserByEmail, createUser, updateUser, deleteUser }