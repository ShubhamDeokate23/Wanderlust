const Listing=require("../models/listing");


module.exports.index=async (req,res)=>{
   const allListing=await Listing.find({});
   res.render("listings/index.ejs",{allListing});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");

};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path: "reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing=async (req,res,next)=>{ 
     let url= req.file.path;
     let filename=req.file.filename; 
     
        const newListing = new Listing (req.body.listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
      await newListing.save();
      req.flash("success","New Listing Created!");
      res.redirect("/listings");

};
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});

    let originalImageUrl=listing.image.url;
originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250")
res.render("listings/edit.ejs",{listing,originalImageUrl});
};


// module.exports.updateListing=async (req, res) => {
//     let { id } = req.params;

//     // Preserve the existing image if no new image is provided
   

//    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//    if(typeof req.file !== "undefined"){
//     let url= req.file.path;
//      let filename=req.file.filename; 
//      listing.image={url,filename};
//      await listing.save();
//    }

//     req.flash("success","Listing Updated!" );

//     res.redirect(`/listings/${id}`);
// };
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    try {
        // Find the listing and update basic info
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings"); // ✅ Stops execution immediately
        }

        // If a new image is uploaded, update it before redirecting
        if (req.file) {
            let uploadedResponse = await cloudinary.uploader.upload(req.file.path);
            listing.image = { filename: uploadedResponse.public_id, url: uploadedResponse.secure_url };
            await listing.save();
        }

        req.flash("success", "Listing Updated!");
        return res.redirect(`/listings/${id}`); // ✅ Ensures only ONE response is sent
    } catch (error) {
        console.error("Error updating listing:", error);
        req.flash("error", "Something went wrong.");
        return res.redirect("/listings"); // ✅ Prevents multiple responses
    }
};
module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");

};