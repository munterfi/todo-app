export const sortAndFilterTodos = (todos, orderBy, descending, filterCompleted) => {
  todos = todos.filter((todo) => todo.state !== "DELETED");

  if (filterCompleted) {
    todos = todos.filter((todo) => todo.state === "OPEN");
  }

  switch (orderBy) {
    case "title":
      todos.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "dueDate":
      todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case "createdDate":
      todos.sort((a, b) => a.createdDate - b.createdDate);
      break;
    case "importance":
      todos.sort((a, b) => a.importance - b.importance);
      break;
    default:
      break;
  }

  if (descending) {
    todos.reverse();
  }

  return todos;
};

export const getProgressAndState = (todos) => {
  let progress = 100;

  if (todos.length > 0) {
    const doneTodos = todos.filter((todo) => todo.state === "DONE");
    const totalTodos = todos.filter((todo) => todo.state !== "DELETED");

    if (totalTodos.length > 0) {
      progress = (doneTodos.length / totalTodos.length) * 100;
    }
  }

  let state = "";
  if (progress === 100) {
    state = "🎉";
  } else if (progress >= 80) {
    state = "👍";
  } else if (progress >= 50) {
    state = "⚡️";
  } else {
    state = "🔥";
  }

  return { progress: Math.round(progress), state };
};
