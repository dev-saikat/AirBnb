const mongo = require("mongoose");
const Schema = mongo.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongo.model("User", userSchema);
module.exports = User;
