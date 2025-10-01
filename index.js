import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

dotenv.config();

const app = express();

// Connect services
await connectCloudinary();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://zip-cart-frontend.vercel.app", // main Vercel
  "https://zip-cart-frontend-git-main-anirudh-singh-rathores-projects.vercel.app", // preview
  "https://zip-cart-frontend-24tip94zu-anirudh-singh-rathores-projects.vercel.app", // preview
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin ${origin}`));
    }
  },
  credentials: true, // allow cookies
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Static files
app.use("/images", express.static("uploads"));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
