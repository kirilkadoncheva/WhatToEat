const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: {type: String, required: false},
    comment: {type: String, required: false},
    rating: {
        type: Number, 
        min: 1,
        max: 5,
        required: true},
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    reviewerName: {type: String, required: true},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true}
})

const reviewModel = new mongoose.model('Review', reviewSchema);
module.exports = reviewModel;