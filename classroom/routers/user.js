const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("hi,i am root");
});
//index-users
router.get("/",(req,res)=>{
    res.send("GET for users");
});
//show-users
router.get("/:id",(req,res)=>{
    res.send("GET id for users");
});
//post-users
router.post("/",(req,res)=>{
    res.send("POST for users");
});
//dlete-users
router.delete("/:id",(req,res)=>{
    res.send("DELETE Id for users");
});

module.exports=router;
