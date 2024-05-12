const model = require('../model/todosModel');

async function createTodo(userId,title,completed) {
  try {
    return model.createTodo(userId,title,completed);
  } catch (err) {
    throw err;
  }
}

async function getTodos(id) {
  try {
    return model.getTodos(id);
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

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }