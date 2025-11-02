const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to Db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL); 
}

const initDB=async()=>{
   await Listing.deleteMany({});
  //  initData.data=initData.data.map((obj)=>({...obj,owner:'6825b76c4944a671fd8155ce'}));
 initData.data = initData.data.map((obj) => ({
  ...obj,
  image: typeof obj.image === "object" && obj.image.url ? obj.image : { filename: "default", url: obj.image }
}));
  initData.data=initData.data.map((obj)=>({...obj,owner:'6825b76c4944a671fd8155ce'}));
   await Listing.insertMany(initData.data);
  
   console.log("data was initialized");
};
initDB();