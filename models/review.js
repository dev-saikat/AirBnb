const mongo = require("mongoose");
const Schema = mongo.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required:true,
    },
    rating: {
        type: Number,
        min: 1,
        max:5
    },
    createdAt: {
        type: Date,
        default:Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
});

const Review = mongo.model("Review", reviewSchema);
module.exports = Review;