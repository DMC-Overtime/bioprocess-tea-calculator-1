const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    firstName: String,
    lastName: String,
    email: String,
    thumbnail: String,
});

const User = mongoose.model('user',userSchema);
module.exports = User;
