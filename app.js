const express=require("express");
const app=express();
const Port=8080;
const path=require("path");
const mongoose=require("mongoose");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(flash()); //flash messages Route se pahile use karna hai
sessionConfig={secret:"mysecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // console.log(res.locals.success); //it is ann empty array
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/wondervilla')
.then((res)=>{
    console.log("Connection established..");
}).catch((err)=>{
    console.log("Database error..");  
});

app.use("/demoUser",async(req,res)=>{
    const user=new User({email:"vic@gmail.com",username:"vic"});
    const registeredUser=await User.register(user,"vic");
    res.send(registeredUser);
    })

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
app.all("*",(req,res,next)=>{
    let message="Page not found..";
    let status=404;
    next(new ExpressError(status,message));
});                                                                                 

app.use((err,req,res,next)=>{
    let error={statusCode=500,message="Something went wrong.."}=err;
    res.render("./listings/error.ejs",{error});
});

app.listen(Port,(req,res)=>{
    console.log(`Connection is open on: `,{Port});
});

