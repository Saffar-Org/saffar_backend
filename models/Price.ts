import * as mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    base_price: {
        type: Number,
        required: true,
    },
    price_per_km: {
        type: Number,
        required: true,
    },
});

const price = mongoose.model('Price', priceSchema, "prices")

export = price;
