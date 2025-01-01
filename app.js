const express = require("express");
const app = express();
const mongo = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
// const { title } = require("process");
const ejsMate = require("ejs-mate");
const Database = "Airbnb";
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

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

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//All listings
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new or Create Routh
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
app.post("/listings",validateListing, wrapAsync(async (req, res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
}))
//Show Routh
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//edit routh
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

//update routh
app.patch("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    let newListing = listing;
    await Listing.findByIdAndUpdate(id, newListing);
    res.redirect(`/listings/${id}`);
}));

//Delete Routh
app.delete("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    
}));

// app.get("/testlisting", async(req, res) => {
//     let samplelisting = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 12000,
//         location: "Goa,",
//         country: "India",
//     });
//     await samplelisting.save();
//     console.log("Sample was Saved");
//     res.send("Successfull");
// })

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});