import * as mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50000,
    },
    stars: {
        type: Number,
        required: true,
        minLength: 0,
        maxLength: 5,
    },
    by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    for: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

const review = mongoose.model("Review", reviewSchema, "reviews");
