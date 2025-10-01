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

// allowed origin from .env

const allowedOrigins = [
  process.env.FRONTEND, // optional: from .env
  "https://zip-cart-frontend-git-main-anirudh-singh-rathores-projects.vercel.app",
  "https://zip-cart-frontend-24tip94zu-anirudh-singh-rathores-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      // allow requests with no origin (like mobile apps, curl) or from allowedOrigins
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
};

export default cors(corsOptions);
// const allowedOrigin = "http://localhost:5173";


// middlewares
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// static files
app.use("/images", express.static("uploads"));

// Api endpoints
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
