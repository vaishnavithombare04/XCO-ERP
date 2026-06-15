import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.rating.deleteMany({});
  await prisma.user.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  
  // Hashed Passwords
  const adminPassword = await bcrypt.hash('AdminPass123!', salt);
  const storePassword = await bcrypt.hash('StorePass123!', salt);
  const userPassword = await bcrypt.hash('UserPass123!', salt);

  // 1. Create System Administrator
  const admin = await prisma.user.create({
    data: {
      name: 'System Administrator Account',
      email: 'admin@storerating.com',
      password: adminPassword,
      address: 'Main Admin Office, 100 System Headquarters Drive, Central City',
      role: Role.ADMIN,
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // 2. Create Store Owners (Stores)
  const store1 = await prisma.user.create({
    data: {
      name: 'Super Store Alpha Location',
      email: 'store1@storerating.com',
      password: storePassword,
      address: '123 Retail Lane, Shop District, East City',
      role: Role.STORE_OWNER,
    },
  });
  const store2 = await prisma.user.create({
    data: {
      name: 'Mega Mart Beta Headquarters',
      email: 'store2@storerating.com',
      password: storePassword,
      address: '456 Commerce Boulevard, Market Area, West City',
      role: Role.STORE_OWNER,
    },
  });
  const store3 = await prisma.user.create({
    data: {
      name: 'Gourmet Food Plaza Station',
      email: 'store3@storerating.com',
      password: storePassword,
      address: '789 Culinary Avenue, Dining District, North City',
      role: Role.STORE_OWNER,
    },
  });
  console.log('Created Store Owners (Stores)');

  // 3. Create Normal Users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe Normal Test User',
      email: 'user1@storerating.com',
      password: userPassword,
      address: '111 Residential Road, Apartment 4B, South City',
      role: Role.NORMAL,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith Second Test User',
      email: 'user2@storerating.com',
      password: userPassword,
      address: '222 Suburb Circle, Green Valley Estate, South City',
      role: Role.NORMAL,
    },
  });
  console.log('Created Normal Users');

  // 4. Create Initial Ratings
  await prisma.rating.createMany({
    data: [
      {
        rating: 4,
        userId: user1.id,
        storeId: store1.id,
      },
      {
        rating: 5,
        userId: user1.id,
        storeId: store2.id,
      },
      {
        rating: 5,
        userId: user2.id,
        storeId: store1.id,
      },
      {
        rating: 3,
        userId: user2.id,
        storeId: store3.id,
      },
    ],
  });
  console.log('Created initial ratings');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
