import Price from "../models/Price"
import Err from "../constants/error";

/// Gets price info from DB then calculates total ride price
const getPriceInfoAndCalculateRidePrice = async (req: any, res: any) => {
    const rideDistanceInKm = req.body.distance;

    // If ride's distance is not given by user then 
    // return 400 response
    if (!rideDistanceInKm) {
        return res.status(400).json({
            error: {
                code: Err.code.EMPTY_PARAM,
                message: Err.message.EMPTY_PARAM,
            },
        });
    }

    // Getting the first Price from MongoDB
    const price = await Price.findOne();

    // If price is not present in MongoDB then return 400 response
    if (!price) {
        return res.status(400).json({
            error: {
                code: Err.code.NO_PRICE_IN_DB,
                message: Err.message.NO_PRICE_IN_DB,
            },
        });
    }

    const basePrice: number = price.base_price;
    const pricePerKm: number = price.price_per_km;

    // Calculate ride price
    const totalRideidePrice: number = basePrice + (rideDistanceInKm * pricePerKm);

    // Return total ride price
    res.json({
        total_price: totalRideidePrice,
    });
}

export = getPriceInfoAndCalculateRidePrice;
