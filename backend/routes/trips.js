const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Search for trips
router.get('/search', async (req, res) => {
    const { originId, destinationId, date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        const trips = await prisma.trip.findMany({
            where: {
                route: {
                    originId: originId,
                    destinationId: destinationId
                },
                departureTime: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                route: {
                    include: { origin: true, destination: true }
                },
                bus: true
            }
        });

        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Trip Details and Seats
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await prisma.trip.findUnique({
            where: { id },
            include: {
                route: { include: { origin: true, destination: true } },
                bus: true,
                seats: true
            }
        });

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const auth = require('../middleware/auth');

// Admin Routes to manage trips
router.post('/', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied' });
    const { routeId, busId, departureTime, price, availableSeats } = req.body;
    try {
        const trip = await prisma.trip.create({
            data: { routeId, busId, departureTime: new Date(departureTime), price, availableSeats }
        });
        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied' });
    const { id } = req.params;
    const { departureTime, price, availableSeats } = req.body;
    try {
        const trip = await prisma.trip.update({
            where: { id },
            data: {
                ...(departureTime && { departureTime: new Date(departureTime) }),
                ...(price && { price }),
                ...(availableSeats && { availableSeats })
            }
        });
        res.json(trip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied' });
    const { id } = req.params;
    try {
        await prisma.trip.delete({ where: { id } });
        res.json({ message: 'Trip deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
