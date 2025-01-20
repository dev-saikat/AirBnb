const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn,isOwner,validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({storage})


//All listings
router.get("/", wrapAsync(listingController.index));

//new or Create Routh
router.get("/new",isLoggedIn, listingController.renderNewFrom);
router.post("/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));
//Show Routh
router.get("/:id", wrapAsync(listingController.showListing));

//edit routh
router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.renderEditForm));

//update routh
router.patch("/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete Routh
router.delete("/:id",isLoggedIn, wrapAsync(listingController.deleteListing));

module.exports = router;