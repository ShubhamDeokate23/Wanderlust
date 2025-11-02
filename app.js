if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing =require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
// const { listingSchema }=require("./schema.js");
// const { reviewSchema } =require("./schema.js");
// const Review =require("./models/review.js");
const session=require("express-session");
const flash=require("connect-flash");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User =require("./models/user.js");

const listingRouter =require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");



  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to Db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL); 
};

const sessionOption={
    secret:"my supersecretecode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24 * 60 * 60 * 1000,
        maxAge:7*24 * 60 * 60 * 1000,
        httpOnly:true,

    },
};


// app.get("/" ,(req,res)=>{
//     res.send("Hi, i am root");
// });




app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//validation function

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.currUser=req.user;
    // console.log(res.locals.success);
    next();
});

// app.get("/demouser", async (req,res)=>{
//     let fakeUser=new User({
//         email:"student@233gmail.com",
//         username:"delta-std",
//     });
//  let registeredUser= await User.register(fakeUser,"helloWorld");
//  res.send(registeredUser);
// });


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//index route

// //create route
// app.post("/listings",validateListing,wrapAsync( async (req,res,next)=>{
//     // let {title,description,image,price,country,location}=req.body;
//     //  let listing=req.body.listing;
//     //  console.log(listing);





// //   let result=listingSchema.validate(req.body);
// //   console.log(result);
// // if(result.error){
// //     throw new ExpressError(400,result.error);
// // }



//     // if(!req.body.listing){
//     //     throw new ExpressError(400 ,"send valid data for listing");
//     // }

    
//         const newListing = new Listing (req.body.listing);
//         // if(!newListing.description){
//         //     throw new ExpressError(400,"Description is missing !");
//         // }
//         //  if(!newListing.title){
//         //     throw new ExpressError(400,"Title is missing !");
//         // }
//         //  if(!newListing.price){
//         //     throw new ExpressError(400,"Price is missing !");
//         // }
//         //  if(!newListing.country){
//         //     throw new ExpressError(400,"Country is missing !");
//         // }
//         //  if(!newListing.location){
//         //     throw new ExpressError(400,"Location is missing !");
//         // }
//     await newListing.save();
//     res.redirect("/listings");

// }));



//edit route



// baad mee cmt kiya hai

// async function getListings() {
//     const listings = await Listing.find({});
//     console.log(listings);
// }
// app.get("/listings/:id", async (req, res) => {
//     const listing = await Listing.findById(req.params.id);
//     res.render("listings/show.ejs", { listing });
// });

// getListings(); // Call the function


//------>edit route



//update route
// app.put("/listings/:id/", validateListing, async (req, res) => {
//     let { id } = req.params;
//      await Listing.findById(id);
//     await Listing.findByIdAndUpdate(id,{...req.body.listing} );

//     res.redirect(`/listings/${id}`);
// });


// app.put("/listings/:id", validateListing, async (req, res) => {
//     let { id } = req.params;
//     console.log("Received image:", req.body.listing.image); // Debugging line

//     let listing = await Listing.findById(id);

//     if (!req.body.listing.image) {
//         req.body.listing.image = listing.image; // Preserve old image
//     }

//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//     res.redirect(`/listings/${id}`);
// });

//------->update route



// app.put("/listings/:id/",validateListing,async (req,res)=>{ 
//     let { id }=req.params; 
//     // const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
//      if (! req.body.listing.image) { 
//        req.body.listing.image=  listing.image; // Preserve old image
//          }
// //
//  await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });




// await listing.save();
//  res.redirect('/listings/${id}');
// });


//delete route


// app.get("/testListing", async (req,res)=>{
//    let sampleListing=new Listing({
//     title:"My New Villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangut, Goa",
//     country:"India",
//    });
//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("Successful Testing")
// });
// app.all("*",(req,res,next)=>{
//    next(new ExpressError(404, "Page Not Found!") );
// });


//reviews
//post route

//DELETE ROUTE FOR REVIEW



app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong!"}=err;
    //  res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
   
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});