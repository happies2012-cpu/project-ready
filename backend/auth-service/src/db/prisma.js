const { PrismaClient } = require('@prisma/client');

// Singleton pattern for Prisma Client
let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
        log: ['error', 'warn'],
    });
} else {
    // In development, use a global variable to prevent multiple instances
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'error', 'warn'],
        });
    }
    prisma = global.prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

module.exports = prisma;
