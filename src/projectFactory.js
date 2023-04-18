const projectFactory = (name) => {
  const todolist = [];
  const addTodo = (todoItem) => {
    todoItem.project = name;
    todolist.push(todoItem);
  };
  const removeTodo = (todoItem) => {
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].title === todoItem.title) {
        todolist[i].project = "";
        todolist.splice(i, 1);
      }
    }
  };
  return { name, todolist, addTodo, removeTodo };
};

export default projectFactory;
