export class IndexController {
    index(req, res) {
        res.redirect("todos");
        // res.render("index", {data: "Nothing here", dark: req.userSettings.darkMode});
    };
}

export const indexController = new IndexController();
