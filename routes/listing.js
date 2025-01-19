const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require('../middleware.js');



//All listings
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new or Create Routh
router.get("/new",isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
}));
//Show Routh
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews",populate:{path:"author"} }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exits!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

//edit routh
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exits!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//update routh
router.patch("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Successfully updated listing!");
    res.redirect(`/listings/${id}`);
}));

//Delete Routh
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted listing!");
    res.redirect("/listings");
    
}));

module.exports = router;