const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const cities = [
        { name: 'Bamako' },
        { name: 'Ségou' },
        { name: 'Mopti' },
        { name: 'Kayes' },
        { name: 'Sikasso' },
        { name: 'Gao' },
        { name: 'Tombouctou' }
    ]

    for (const city of cities) {
        await prisma.city.upsert({
            where: { name: city.name },
            update: {},
            create: city
        })
    }

    const bamako = await prisma.city.findUnique({ where: { name: 'Bamako' } })
    const segou = await prisma.city.findUnique({ where: { name: 'Ségou' } })

    if (bamako && segou) {
        await prisma.route.upsert({
            where: { originId_destinationId: { originId: bamako.id, destinationId: segou.id } },
            update: {},
            create: { originId: bamako.id, destinationId: segou.id, distanceKm: 240 }
        })
    }

    // Create admin user
    const adminPassword = await require('bcryptjs').hash('admin123', 10)
    await prisma.user.upsert({
        where: { phone: '12345678' },
        update: {},
        create: {
            phone: '12345678',
            password: adminPassword,
            name: 'Admin MaliTransport',
            role: 'ADMIN',
            email: 'admin@transport.ml'
        }
    })

    // Create sample bus
    const bus = await prisma.bus.upsert({
        where: { plateNumber: 'AZ-1234-MD' },
        update: {},
        create: {
            plateNumber: 'AZ-1234-MD',
            type: 'VIP',
            capacity: 32
        }
    })

    console.log('Seeded database with Admin and Sample Data!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
