const todoFactory = (
  title,
  description,
  dueDate,
  project,
  hasPriority,
  completed,
  id
) => {
  hasPriority = false;
  completed = false;
  return { title, description, dueDate, project, hasPriority, completed, id };
};

export default todoFactory;
