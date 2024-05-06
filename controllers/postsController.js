const model = require('../model/postsModel');

async function createPost(userId,title,body) {
  try {
    return model.createPost(userId,title,body);
  } catch (err) {
    throw err;
  }
}

async function getPost(id) {
  try {
    return model.getPost(id);
  } catch (err) {
    throw err;
  }
}

async function updatePost(id,userId,title,body) {
  try {
    return model.updatePost(id,userId,title,body);
  } catch (err) {
    throw err;
  }
}
async function deletePost(id) {
  try {
    return model.deletePost(id);
  } catch (err) {
    throw err;
  }
}

module.exports = { getPost, createPost, updatePost, deletePost }