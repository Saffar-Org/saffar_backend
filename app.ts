import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import rideRouter from "./routes/ride_router";
import driverSignInRouter from "./routes/driver_sign_in_router";
import driverSignUpRouter from "./routes/driver_sign_up_router";
import signInRouter from "./routes/sign_in_router";
import signUpRouter from "./routes/sign_up_router";

// Configuration for using .env file
dotenv.config();

// Setting port to PORT in .env or 5000 if port in .env is null
const PORT = process.env.PORT || 5000;

const app = express();

// JSON body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connecting to MongoDB
if (process.env.MONGODB_CONNECTION_URL != undefined) {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .catch((error: any) => console.log(error));
}

// Sign UP API Routes
app.use("/api/sign_up", signUpRouter);
app.use("/api/driver_sign_up", driverSignUpRouter);

// Sign In API Routes
app.use("/api/sign_in", signInRouter);
app.use("/api/driver_sign_in", driverSignInRouter);

// Previous rides API Routes
app.use("/api/previous_rides", rideRouter);

// Listening to PORT
app.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`));

export { };

