export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDescending: false, filterCompleted: false, darkMode: false};
    const {orderBy, orderDescending, filterCompleted, darkMode} = req.query;

    if (orderBy) {
        // TODO: Toggle only works 2 times
        userSettings.orderDescending = userSettings.orderBy === orderBy ? !orderDescending : orderDescending;
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
