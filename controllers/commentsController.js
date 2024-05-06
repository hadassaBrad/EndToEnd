const model = require('../model/commentsModel');

async function createComment(postId,name,email,body) {
  try {
    return model.createComment(postId,name,email,body);
  } catch (err) {
    throw err;
  }
}

async function getComment(id) {
  try {
    return model.getComment(id);
  } catch (err) {
    throw err;
  }
}

async function updateComment(id,postId,name,email,body) {
  try {
    return model.updateComment(id,postId,name,email,body);
  } catch (err) {
    throw err;
  }
}
async function deleteComment(id) {
  try {
    return model.deleteComment(id);
  } catch (err) {
    throw err;
  }
}

module.exports = { getComment, createComment, updateComment, deleteComment }