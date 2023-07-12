export class IndexController {
    index(req, res) {
        res.redirect("todos");
    };
}

export const indexController = new IndexController();
