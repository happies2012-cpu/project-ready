const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // 1. Create System Settings
    const settings = [
        { key: 'SITE_NAME', value: 'Project Ready', isPublic: true },
        { key: 'MAINTENANCE_MODE', value: 'false', isPublic: true, type: 'boolean' },
        { key: 'MAX_UPLOAD_SIZE', value: '52428800', isPublic: true, type: 'number' },
        { key: 'SUPPORT_EMAIL', value: 'support@projectready.com', isPublic: true },
        { key: 'ALLOW_REGISTRATION', value: 'true', isPublic: true, type: 'boolean' }
    ];

    for (const setting of settings) {
        await prisma.systemSetting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting
        });
    }
    console.log('✅ System Settings seeded');

    // 2. Create Roles (implicitly via Users) & Admin User
    const adminEmail = 'admin@projectready.com';
    const adminPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: 'Super Admin',
            password: adminPassword,
            role: 'admin',
            emailVerified: true,
            isActive: true
        }
    });

    console.log(`✅ Admin user created: ${admin.email}`);

    // 3. Create Demo User
    const userEmail = 'demo@projectready.com';
    const userPassword = await bcrypt.hash('User@123', 10);

    await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: 'Demo User',
            password: userPassword,
            role: 'user',
            emailVerified: true,
            isActive: true
        }
    });

    console.log(`✅ Demo user created: ${userEmail}`);
    console.log('🌱 Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
