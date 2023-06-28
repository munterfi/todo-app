import Datastore from 'nedb-promises'

export class Todo {
    constructor(title, dueDate, importance, description) {
        this.title = title;
        this.dueDate = dueDate;
        this.importance = importance;
        this.description = description;
        this.createdDate = new Date();
        this.state = "OPEN";
    }
}

export class TodoStore {
    constructor(db) {
        // const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        const options = {filename: './data/todos.db', autoload: true};
        this.db = db || new Datastore(options);
    }

    async add(title, dueDate, importance, description) {
        let todo = new Todo(title, dueDate, importance, description);
        return this.db.insert(todo);
    }

    async update(id, updatedFields) {
        await this.db.update({_id: id}, {$set: updatedFields});
        return this.get(id);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async all() {
        let todos = this.db.find({}).sort({orderDate: -1}).exec();
        // (await todos).push(new Todo("test1", new Date(), 3, "Lorem ipsum"));
        // (await todos).push(new Todo("test2", new Date(), 2, "Lorem ipsum dolor"));
        return todos;
    }
}

export const todoStore = new TodoStore();
