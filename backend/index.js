const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Rate Limiter for security
const rateLimiter = require('./middleware/rateLimiter');

// Production CORS Settings
const allowedOrigins = [
    'http://localhost:5173', // Admin local
    'http://localhost:5174', // Client local
    process.env.FRONTEND_CLIENT_URL,
    process.env.FRONTEND_ADMIN_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    }
}));

app.use(express.json());

// Apply rate limiting to auth routes to prevent brute force
const authLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // max 20 attempts
    message: "Trop de tentatives de connexion. Réessayez dans 15 minutes."
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const reservationRoutes = require('./routes/reservations');
const cityRoutes = require('./routes/cities');
const busRoutes = require('./routes/bus');
const paymentRoutes = require('./routes/payments');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});

module.exports = { app, prisma };
