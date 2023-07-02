import * as mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    driver: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Driver",
    },
    source_address: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Address",
    },
    destination_address: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Address",
    },
    start_time: {
        type: Date,
        required: true,
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

const ride = mongoose.model("Ride", rideSchema, "rides");

export = ride;
 