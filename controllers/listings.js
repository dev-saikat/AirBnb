const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewFrom = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exits!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exits!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Successfully updated listing!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted listing!");
    res.redirect("/listings");
    
};