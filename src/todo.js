const todoFactory = (title, description, dueDate, hasPriority, completed) => {
  hasPriority = false;
  completed = false;
  return { title, description, dueDate, hasPriority, completed };
};

export default todoFactory;
