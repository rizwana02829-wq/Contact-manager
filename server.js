import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './dbConfig/dbConfig.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoute from './routes/authRoutes.js';
import contactRoute from './routes/contactRoutes.js'
import userRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
// Routes
app.use('/api/auth', authRoute);
app.use('/api/contacts',contactRoute);
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send(' contact manager API is running' );
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});

