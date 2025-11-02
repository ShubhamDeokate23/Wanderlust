const express=require("express");
const router =express.Router();
//index-users
router.get("/",(req,res)=>{
    res.send("GET for posts ");
});
//show-users
router.get("/:id",(req,res)=>{
    res.send("GET id for posts");
});
//post-users
router.post("/",(req,res)=>{
    res.send("POST for posts");
});
//dlete-users
router.delete("/:id",(req,res)=>{
    res.send("DELETE Id for posts");
});

module.exports=router;