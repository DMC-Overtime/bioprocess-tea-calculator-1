const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teaSchema = new Schema({
    productName: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Tea = mongoose.model('Tea',teaSchema);
module.exports = Tea;