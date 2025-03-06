const mongo = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Database Connect
main().then(() => {
    console.log("Database Conected");
}).catch(err => console.log(err));
async function main() {
    await mongo.connect('mongodb://127.0.0.1:27017/Airbnb')
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: '678eaf28596a36c475bdc5d8',
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();