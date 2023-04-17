const projectFactory = (name) => {
  const todolist = [];
  const addTodo = (todoItem) => {
    todolist.push(todoItem);
  };
  const removeTodo = (todoItem) => {
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].title === todoItem.title) {
        todolist.splice(i, 1);
      }
    }
  };
  return { name, todolist, addTodo, removeTodo };
};

export default projectFactory;
