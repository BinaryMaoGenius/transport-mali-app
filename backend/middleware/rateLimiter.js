// Simple manual rate limiter to prevent brute force attacks
// Stores request counts in memory (reset on server restart)

const requestCounts = new Map();

const rateLimiter = (options) => {
    const { windowMs, max, message } = options;

    return (req, res, next) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const now = Date.now();

        if (!requestCounts.has(ip)) {
            requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
            return next();
        }

        const stats = requestCounts.get(ip);

        // Reset if window has passed
        if (now > stats.resetTime) {
            stats.count = 1;
            stats.resetTime = now + windowMs;
            return next();
        }

        stats.count++;

        if (stats.count > max) {
            return res.status(429).json({
                error: message || 'Trop de requêtes, veuillez réessayer plus tard.'
            });
        }

        next();
    };
};

module.exports = rateLimiter;
