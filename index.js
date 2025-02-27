import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/api.js';


/// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/// Initialize Express App
const app = express();
dotenv.config();

/// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/// App Use Default Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

/// App Use Limiter
const limiter = rateLimit({ windowMs: '20 * 60 * 1000', max: '2000' });
app.use(limiter);

/// Cache
app.set('etag', true);

/// Database Connect
// const DATABASE = 'mongodb+srv://emancht:4150@bookshop.nlent.mongodb.net/portfolioDB';
// const MONGO_URI = 'mongodb://localhost:27017/portfolioDB';
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(() => {
    console.log('MongoDB disconnected');
  });

/// App Use Routes
app.use('/api', router);


/// Start Server
// const PORT = 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
