export class IndexController {
    index(req, res) {
        res.render("index", {data: req.userSettings.orderBy, dark: true});
        // ?orderBy=createdBy
        // req.userSettings.orderDirection
    };
}

export const indexController = new IndexController();
