const User = require("../models/user");


module.exports.renderSignUp = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Airbnb");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderSignIn = (req, res) => {
    res.render("users/signin.ejs");
};

module.exports.signIn = async (req, res) => {
    req.flash("success", "Welcome back to AirBnb You are Successfully Loged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    
};

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};