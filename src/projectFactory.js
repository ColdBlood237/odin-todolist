let tasksCounter = 0;

const projectFactory = (name, id) => {
  let todolist = [];
  const addTodo = (todoItem) => {
    todoItem.project = name;
    todoItem.id = tasksCounter;
    todolist.push(todoItem);
    tasksCounter++;
  };
  const removeTodo = (todoItem) => {
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].title === todoItem.title) {
        todolist[i].project = "";
        todolist.splice(i, 1);
      }
    }
  };
  return { name, todolist, id, addTodo, removeTodo };
};

export default projectFactory;
