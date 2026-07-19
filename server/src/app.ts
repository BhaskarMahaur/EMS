import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes";


const app = express();


// Security middleware
app.use(helmet());


// Enable CORS
app.use(cors());


// Logger
app.use(morgan("dev"));


// Parse JSON body
app.use(express.json());


// Parse cookies
app.use(cookieParser());


// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running 🚀",
  });
});


// API Routes
app.use("/api", routes);


export default app;