const joi=require('joi');

const listingSchema=joi.object({
    title:joi.string().required(),
    price:joi.number().required().min(0),
    description:joi.string().required(),
    country:joi.string().required(),
    location:joi.string().required(),
});

const reviewSchema=joi.object({
    rating:joi.number().required().min(1).max(5),
    comment:joi.string().required(),
});

module.exports={listingSchema,reviewSchema};