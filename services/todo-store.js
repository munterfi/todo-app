import Datastore from 'nedb-promises'

export class Todo {
    constructor(title) {
        this.title = title;
        this.createdDate = new Date();
        this.state = "OK";
    }
}

export class TodoStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(title) {
        let order = new Todo(title);
        return this.db.insert(order);
    }

    async delete(id,) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async all() {
        return this.db.all().sort({ orderDate: -1 }).exec();
    }
}

export const todoStore = new TodoStore();
