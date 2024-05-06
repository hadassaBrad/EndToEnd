const model = require('../model/todosModel');

async function createTodo(userId,title,completed) {
  try {
    return model.createTodo(userId,title,completed);
  } catch (err) {
    throw err;
  }
}

async function getTodo(id) {
  try {
    return model.getTodo(id);
  } catch (err) {
    throw err;
  }
}

async function updateTodo(id,userId,title,completed) {
  try {
    return model.updateTodo(id,userId,title,completed);
  } catch (err) {
    throw err;
  }
}
async function deleteTodo(id) {
  try {
    return model.deleteTodo(id);
  } catch (err) {
    throw err;
  }
}

module.exports = { getTodo, createTodo, updateTodo, deleteTodo }