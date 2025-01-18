module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You Must Be Logged in");
        return res.redirect("/login");
    }
    next();
};