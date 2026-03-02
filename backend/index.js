const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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
