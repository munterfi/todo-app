export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDirection: -1, filterCompleted: 0, darkStyle: 0};
    const {orderBy, orderDirection, filterCompleted, darkStyle} = req.query;

    console.log("Before assignments:");
    console.log("orderBy:", orderBy);
    console.log("orderDirection:", orderDirection);
    console.log("filterCompleted:", filterCompleted);
    console.log("darkStyle:", darkStyle);

    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    if (filterCompleted) {
        userSettings.filterCompleted = filterCompleted;
    }
    if (darkStyle) {
        userSettings.darkStyle = darkStyle;
    }

    console.log("Got userSettings: ", { ...userSettings });

    req.userSettings = req.session.userSettings = userSettings;
    next();
};
