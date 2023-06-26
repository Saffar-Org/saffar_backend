import * as mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    driver: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    source_address: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    destination_address: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0.0,
    },
    discount_price: {
        type: Number,
    },
});

const ride = mongoose.model("Ride", rideSchema, "Rides");

export = ride;
