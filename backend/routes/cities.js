const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const auth = require('../middleware/auth');

// Get available cities
router.get('/', async (req, res) => {
    try {
        const cities = await prisma.city.findMany();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Only Routes below
router.post('/', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') return res.status(403).json({ error: 'Denegado' });
    const { name } = req.body;
    try {
        const city = await prisma.city.create({ data: { name } });
        res.status(201).json(city);
    } catch (err) {
        res.status(400).json({ error: 'City already exists' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    if (req.userData.role !== 'ADMIN') return res.status(403).json({ error: 'Denegado' });
    const { id } = req.params;
    try {
        await prisma.city.delete({ where: { id } });
        res.json({ message: 'City deleted' });
    } catch (err) {
        res.status(404).json({ error: 'City not found' });
    }
});

module.exports = router;
