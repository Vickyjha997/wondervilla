const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    rating:{
        type:Number,
        required:true,
        default:1,
        min:1,
        max:5,
    },
    comment:{
        type:String,
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    }   
});

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;