const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const QRCode = require('qrcode');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create Reservation (Booking)
router.post('/', auth, async (req, res) => {
    const { tripId, seatNumbers, paymentMethod } = req.body;
    const userId = req.userData.userId;

    try {
        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: { bus: true }
        });

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const totalPrice = trip.price * seatNumbers.length;
        const ticketNumber = `TKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        // Create Reservation
        const reservation = await prisma.reservation.create({
            data: {
                userId,
                tripId,
                totalPrice,
                ticketNumber,
                status: 'PENDING_PAYMENT',
            }
        });

        // Create Payment (Simulated)
        const payment = await prisma.payment.create({
            data: {
                reservationId: reservation.id,
                amount: totalPrice,
                method: paymentMethod, // ORANGE_MONEY, MOOV_MONEY
                transactionRef: `TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                status: 'PENDING'
            }
        });

        res.json({
            message: 'Reservation created',
            reservation,
            payment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Confirm Payment (Simulated)
router.post('/:id/confirm', auth, async (req, res) => {
    const { id } = req.params;
    const { transactionRef } = req.body;

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id },
            include: { trip: true, user: true }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Generate QR Code with ID and Ticket Number for verification
        const qrText = `http://verify.transport.ml/ticket/${reservation.ticketNumber}`;
        const qrCode = await QRCode.toDataURL(qrText);

        // Update Reservation and Payment
        const updatedReservation = await prisma.reservation.update({
            where: { id },
            data: {
                status: 'CONFIRMED',
                qrCode
            }
        });

        await prisma.payment.update({
            where: { reservationId: id },
            data: { status: 'SUCCESS', transactionRef }
        });

        res.json({
            message: 'Payment confirmed and Ticket generated',
            ticket: {
                ticketNumber: reservation.ticketNumber,
                qrCode: qrCode,
                message: 'Notification push et SMS envoyés (Simulation)'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Reservations
router.get('/history', auth, async (req, res) => {
    const userId = req.userData.userId;
    const reservations = await prisma.reservation.findMany({
        where: { userId },
        include: {
            trip: {
                include: { route: { include: { origin: true, destination: true } } }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    res.json(reservations);
});

module.exports = router;
