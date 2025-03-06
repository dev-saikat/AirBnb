const mongo = require("mongoose");
const { listingSchema } = require("../schema");
const Review = require("./review");
const { ref } = require("joi");
const Schema = mongo.Schema;

const linstingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: String,
    image: {
        url: String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
});

linstingSchema.post("findOneAndDelete", async (listing)=> {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});


const Listing = mongo.model("Listing", linstingSchema);
module.exports = Listing;