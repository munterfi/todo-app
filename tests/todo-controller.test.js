import chai from 'chai';
import {Todo} from "../services/todo-store.js";
import {sortAndFilterTodos} from "../utils/todo-list-helpers.js";

//Setup
const todo1 = new Todo("AAAA", new Date("2000-01-01"), 8, "A Description");
todo1.state = "DONE"
const todo2 = new Todo("BBBB", new Date("2000-01-03"), 9, "B Description");
todo2.state = "OPEN"
const todo3 = new Todo("CCCC", new Date("2000-01-02"), 1, "C Description");
todo3.state = "OPEN"
const todos = [];
todos.push(todo1, todo2, todo3);
const assert = chai.assert;

describe('sortAndFilterTodos', function () {
    describe('Sorting', function () {
        it('should return descending titles', function () {
            const result = sortAndFilterTodos(todos, "title", true, false);
            assert.equal(result.pop().title, todo1.title, "Title order descending wrong");
        });

        it('should return ascending titles', function () {
            const result = sortAndFilterTodos(todos, "title", false, false);
            assert.equal(result.pop().title, todo3.title, "Title order ascending is wrong");
        });

        it('should return descending due dates', function () {
            const result = sortAndFilterTodos(todos, "dueDate", true, false);
            assert.equal(result.pop().dueDate, todo1.dueDate, "Due date descending wrong");
        });

        it('should return ascending due dates', function () {
            const result = sortAndFilterTodos(todos, "dueDate", false, false);
            assert.equal(result.pop().dueDate, todo2.dueDate, "Due date ascending is wrong");
        });

        it('should return descending importance', function () {
            const result = sortAndFilterTodos(todos, "importance", true, false);
            assert.equal(result.pop().importance, todo2.importance, "Importance descending wrong");
        });

        it('should return ascending importance', function () {
            const result = sortAndFilterTodos(todos, "importance", false, false);
            assert.equal(result.pop().importance, todo3.importance, "Importance ascending is wrong");
        });

        it('should return todos even with not existing orderBy argument value', function () {
            const result = sortAndFilterTodos(todos, "justSomeCrazyOrdering", true, false);
            assert.equal(result.length, 3, "return value with not existing orderBy argument is wrong");
        });
    });

    describe('Filter', function () {
        it('should return only open todos', function () {
            const result = sortAndFilterTodos(todos, "title", true, true);
            assert.equal(result.length, 2, "filter only open todos is wrong");
            assert.equal(result.pop().title, todo2.title, "filter only open todos is wrong");
            assert.equal(result.pop().title, todo3.title, "filter only open todos is wrong");
        });

        it('should return all todos', function () {
            const result = sortAndFilterTodos(todos, "title", true, false);
            assert.equal(result.length, 3, "filter all todos is wrong");
        });

    });

});