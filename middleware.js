module.exports.isLoggedIn=(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Please Login into Page...")
        res.redirect("/login");
    }
    next();
}