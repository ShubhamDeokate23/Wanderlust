const express =require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const { listingSchema }=require("../schema.js");
// const ExpressError=require("../utils/ExpressError.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


router.get("/new",isLoggedIn,listingController.renderNewForm);

// router.route("/:id").get(wrapAsync(listingController.showListing))
// .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.upadateListing))
// .delete(isLoggedIn,isOwner ,wrapAsync(listingController.destroyListing));

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) // ✅ Correct spelling
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.renderEditForm));


//validate wala method

//index routes
// router.get("/",wrapAsync(listingController.index));


// //new route
// router.get("/new",isLoggedIn,listingController.renderNewForm);
//show route
// router.get("/:id",wrapAsync(listingController.showListing));

//create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//edit route
// router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.renderEditForm));

//update route
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.upadateListing));

//delete route
// router.delete("/:id",isLoggedIn,isOwner ,wrapAsync(listingController.destroyListing));
module.exports=router;