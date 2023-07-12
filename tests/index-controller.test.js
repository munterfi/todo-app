import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;

describe('INDEX Controller: GET /', () => {
    it('should redirect to index page and return OK 200', async () => {
        const response = await chai.request(app).get('/');

        response.should.have.status(200);

        response.redirects.length.should.be.greaterThanOrEqual(1);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("<div class=\"todo-list-header\">")
    });
});

describe('TODO Controller: GET /id', () => {
    it('should return not found 404 page', async () => {
        const response = await chai.request(app).get('/todos/AnIdWhichDoesNotExist');
        response.should.have.status(404);
    });
});
