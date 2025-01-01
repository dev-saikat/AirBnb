const mongo = require("mongoose");
const Schema = mongo.Schema;

const linstingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: String,
    image: {
        type: String,
        default:"https://images.unsplash.com/photo-1734375119887-460f4b97dfaa?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1734375119887-460f4b97dfaa?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price: Number,
    location: String,
    country: String,
});


const Listing = mongo.model("Listing", linstingSchema);
module.exports = Listing;