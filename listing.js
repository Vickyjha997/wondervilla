const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true, default: "Listing Title," },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "imageListing",
    },
    url: {
      default:
        "https://ik.imagekit.io/5tgxhsqev/saffronstays-media/tr:w-800,h-460,q-62,f-webp/image/upload/wvovvtcku7cbvewf146c",
      type: String,
      set: (value) =>
        value === ""
          ? "https://server.ekostay.com/public/property_images/65f44dfca6dc3_AnyConv.webp"
          : value,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
listingSchema.post("findOneAndDelete", async(listing) => {
  
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
    console.log("Review deleted....")  
    // Add your code here to perform actions after deletion
  }
});

//For creating model//
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
