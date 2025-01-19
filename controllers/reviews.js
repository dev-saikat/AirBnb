const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully added review!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, review_id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/listings/${id}`);
};