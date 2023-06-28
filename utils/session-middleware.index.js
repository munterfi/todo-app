export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {
        orderBy: 'title', orderDescending: false, filterCompleted: false, darkMode: false
    };
    const {orderBy, filterCompleted, darkMode} = req.query;

    if (orderBy) {
        userSettings.orderDescending = userSettings.orderBy === orderBy ? !userSettings.orderDescending : userSettings.orderDescending;
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
