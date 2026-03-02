const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev_key';

// Mock OTP storage
const OTP_STORE = {};

router.post('/register', async (req, res) => {
    const { phone, password, name, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { phone, password: hashedPassword, name, email }
        });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: 'Phone or email already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { name: user.name, phone: user.phone, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/send-otp', (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    OTP_STORE[phone] = otp;
    // Simulation: Envoi via SMS non implémenté ici pour l'exemple
    console.log(`[OTP] Sent ${otp} to ${phone}`);
    res.json({ message: 'OTP sent (check server console)' });
});

router.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;
    if (OTP_STORE[phone] === otp) {
        delete OTP_STORE[phone];
        res.json({ message: 'Verified' });
    } else {
        res.status(401).json({ error: 'Invalid OTP' });
    }
});

module.exports = router;
