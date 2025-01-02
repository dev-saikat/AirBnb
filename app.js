const express = require("express");
const app = express();
const mongo = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
// const { title } = require("process");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const Database = "Airbnb";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Database Connect
main().then(() => {
    console.log("Database Conected");
}).catch(err => console.log(err));
async function main() {
    await mongo.connect(`mongodb://127.0.0.1:27017/${Database}`,);
}

// Basic routh
app.get("/", wrapAsync(async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/homepage.ejs", { allListings });
}));



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    res.render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});