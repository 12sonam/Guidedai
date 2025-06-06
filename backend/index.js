import express from 'express';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import adminRoute from './routes/admin.js';
import guideRoute from './routes/guides.js';
import guideReviewRoute from './routes/guideReviews.js'; 
import itineraryRoute from './routes/itineraries.js';
import { errorHandler } from './middleware/errorHandler.js';

import khalti from './controllers/inatializekhalti.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
// const corsOptions = {
//     origin:true,
//     credentials:true
// }

// Proper CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type, Authorization",
};

// database connection
mongoose.set('strictQuery', false)
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI/*,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }*/)

        console.log('MongoDB database connected');
    } catch (err) {
        console.log('Mongodb database connection failed');
    }
}

// middleware 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(errorHandler);
app.use('/images/tours', express.static('public/images/tours'));
app.use('/api/v2/uploads', express.static('uploads'));
app.use('/api/v2/auth', authRoute);
app.use('/api/v2/tours', tourRoute);
app.use('/api/v2/users', userRoute);
app.use('/api/v2/review', reviewRoute);
app.use('/api/v2/booking', bookingRoute);
// app.use('/api/admin', adminRoute);
app.use('/api/v2/admin', adminRoute);
app.use('/api/v2/guides', guideRoute);
app.use('/api/v2/guide-reviews', guideReviewRoute);
app.use('/api/v2/itineraries', itineraryRoute);
app.use("/api/v2/payment", khalti);

app.listen(port, ()=>{
    connect();  
    console.log('server listening on port', port);
});