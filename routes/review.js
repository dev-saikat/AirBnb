const express = require('express');
const router = express.Router( { mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
let reviewController=require('../controllers/reviews.js');




//Review Routh
//post routh
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//Delete Routh
router.delete("/:review_id", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;