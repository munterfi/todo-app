export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {
        orderBy: 'titleDesc', orderDescending: true, filterCompleted: false, darkMode: false
    };
    const {orderBy, filterCompleted, darkMode} = req.query;

    if (orderBy) {
        userSettings.orderDescending = orderBy.includes("Desc");
        userSettings.orderBy = orderBy;
    }
    if (filterCompleted) {
        userSettings.filterCompleted = filterCompleted === "true";
    }
    if (darkMode) {
        userSettings.darkMode = darkMode === "true";
    }

    req.userSettings = req.session.userSettings = userSettings;
    next();
};
