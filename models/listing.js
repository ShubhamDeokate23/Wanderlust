const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

// const listingSchema= new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image:{
        
//         type:String,
        
    
//         default:"https://imgs.search.brave.com/FjepmmiKjSSqwTf6-XHQcnZLgV0BOFjZ4b_AoyxcO0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9icmVhdGh0YWtp/bmctYmFsaS1uYXR1/cmUtZnJlZS1waG90/by5qcGc_dz02MDAm/cXVhbGl0eT04MA ",
//         set:(v)=> v ===" "
//         ? "https://imgs.search.brave.com/FjepmmiKjSSqwTf6-XHQcnZLgV0BOFjZ4b_AoyxcO0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9icmVhdGh0YWtp/bmctYmFsaS1uYXR1/cmUtZnJlZS1waG90/by5qcGc_dz02MDAm/cXVhbGl0eT04MA " 
//         :v,
//     },
//     price:Number,
//     location:String,
//     country:String,

// });
const listingSchema = new mongoose.Schema({ //mongoose.Schema
    title: { type: String, required: true },
    description: String,
    image: {
      // type: String,  // Explicitly define type as String 
      // default: "https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.webp",
      // set: (v) => v === "" ? "https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.webp" : v,

      filename: String,  
      url: String, 
  },
    price: { type: Number, default: 0 },
    location: String,
    country: String,
    

    reviews:[
      {
          type:Schema.Types.ObjectId,
          ref:"Review",
        

       }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
  });

  listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
      await Review.deleteMany({_id:{$in:listing.reviews}});
    }

  });

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;