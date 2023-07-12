export const sortAndFilterTodos = (todos, orderBy, descending, filterCompleted) => {
    todos = todos.filter((todo) => todo.state !== "DELETED");

    if (filterCompleted) {
        todos = todos.filter((todo) => todo.state === "OPEN");
    }
    switch (getSortingCriteriaWithoutOrder(orderBy)) {
        case "title":
            if (todos.every((todo, idx, todoArray) => todo.title === todoArray[0].title)) {
                break;
            }
            todos.sort((a, b) => a.title.localeCompare(b.title));
            if (descending) {
                todos.reverse();
            }
            break;
        case "dueDate":
            if (todos.every((todo, idx, todoArray) => todo.dueDate === todoArray[0].dueDate)) {
                break;
            }
            todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            if (descending) {
                todos.reverse();
            }
            break;
        case "createdDate":
            if (todos.every((todo, idx, todoArray) => todo.createdDate === todoArray[0].createdDate)) {
                break;
            }
            todos.sort((a, b) => a.createdDate - b.createdDate);
            if (descending) {
                todos.reverse();
            }
            break;
        case "importance":
            if (todos.every((todo, idx, todoArray) => todo.importance === todoArray[0].importance)) {
                break;
            }
            todos.sort((a, b) => a.importance - b.importance);
            if (descending) {
                todos.reverse();
            }
            break;
        default:
            break;
    }

    return todos;
};

const getSortingCriteriaWithoutOrder = (orderByCriteriaWithOrder) => {
    return orderByCriteriaWithOrder.replace('Asc', '').replace('Desc', '');
}

export const getProgressAndState = (todos) => {
    let progress = 100;

    if (todos.length > 0) {
        const doneTodos = todos.filter((todo) => todo.state === "DONE");
        const totalTodos = todos.filter((todo) => todo.state !== "DELETED");

        if (totalTodos.length > 0) {
            progress = (doneTodos.length / totalTodos.length) * 100;
        }
    }

    let state;
    if (progress === 100) {
        state = "🎉";
    } else if (progress >= 80) {
        state = "👍";
    } else if (progress >= 50) {
        state = "⚡️";
    } else {
        state = "🔥";
    }

    return {progress: Math.round(progress), state};
};
