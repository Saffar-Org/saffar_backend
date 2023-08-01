import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import rideRouter from "./routes/ride_router";
import authRouter from "./routes/auth_router";
import userRouter from "./routes/user_router";

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

// Auth router
app.use("/api/auth", authRouter);

// Ride router
app.use("/api/ride", rideRouter);

// User router
app.use("/api/user", userRouter);

// Listening to PORT
app.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`));

export { };

