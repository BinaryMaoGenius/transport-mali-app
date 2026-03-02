const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all buses
router.get('/', auth, async (req, res) => {
    try {
        const buses = await prisma.bus.findMany();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a bus by ID
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await prisma.bus.findUnique({ where: { id } });
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a bus (Admin only)
router.post('/', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
    }
    const { plateNumber, type, capacity } = req.body;
    try {
        const bus = await prisma.bus.create({
            data: { plateNumber, type, capacity }
        });
        res.status(201).json(bus);
    } catch (err) {
        res.status(400).json({ error: 'Plate number already exists' });
    }
});

// Update a bus (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
    }
    const { id } = req.params;
    const { plateNumber, type, capacity } = req.body;
    try {
        const bus = await prisma.bus.update({
            where: { id },
            data: { plateNumber, type, capacity }
        });
        res.json(bus);
    } catch (err) {
        res.status(404).json({ error: 'Bus not found' });
    }
});

// Delete a bus (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
    }
    const { id } = req.params;
    try {
        await prisma.bus.delete({ where: { id } });
        res.json({ message: 'Bus deleted' });
    } catch (err) {
        res.status(404).json({ error: 'Bus not found' });
    }
});

module.exports = router;
