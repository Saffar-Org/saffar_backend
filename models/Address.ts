import * as mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    place: {
        type: String,
    },
    street: {
        type: String,
        default: "Unnamed Road",
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
    },
});

const address = mongoose.model("Address", addressSchema, "addresses");

export = address;
