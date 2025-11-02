const express=require("express");
const app=express();
const users=require("./routers/user.js");
const posts=require("./routers/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// app.use(session({
//   secret: 'mysupersecretstring',
//   resave: false,
//   saveUninitialized: true,
// //   cookie: { secure: true }
// }));


const sessionOptions={
  secret: 'mysupersecretstring',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
};
app.use(session(sessionOptions));

app.use(flash());

app.use((req,res,next)=>{
        res.locals.successMsg=req.flash("success");
   res.locals.errorMsg=req.flash("error");
  next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
   req.session.name=name;
   
   if(name==="anonymous"){
    req.flash("error","user not registered");
   }else{
    req.flash("success","user registered succesfully");
   }
    res.redirect("/hello");
  

});

app.get("/hello",(req,res)=>{
    // res.send(`hello,${req.session.name}`);

    res.render("page.ejs",{name:req.session.name,});
});
app.get("/reqcount",(req,res)=>{
     if( req.session.count){
         req.session.count++;
     }else{
         req.session.count=1;
     }
    res.send(`You sent s request ${req.session.count} times`);
});
// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// });
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");

// });
// app.get("/getcoockies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("sent you some cookies");
// });
// app.get("/greet",(req,res)=>{
//     let {name ="anynomus"}=req.cookies;
//     res.send(`hi.${name}`);
// });
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi,i am root");
// });
// app.use("/users",users);
// app.use("/posts",posts);
// //index-users
// app.get("/users",(req,res)=>{
//     res.send("GET for users");
// });
// //show-users
// app.get("/users/:id",(req,res)=>{
//     res.send("get id for users");
// });
// //post-users
// app.post("/users",(req,res)=>{
//     res.send("POST for users");
// });
// //dlete-users
// app.delete("/users/:id",(req,res)=>{
//     res.send("DELETE Id for users");
// });


//express session 

app.listen(3000,()=>{
    console.log("sever is listening port 3000");
});