import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL is not defined. Seed skipped.');
  process.exit(0);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function findOrCreateProperty({ name, address, starttime }) {
  let property = await prisma.properties.findFirst({ where: { name } });
  if (!property) {
    property = await prisma.properties.create({
      data: { name, address, starttime },
    });
  }
  return property;
}

async function findOrCreateTimesheet({ userid, propertyid, clockedin, clockedout }) {
  let timesheet = await prisma.timesheets.findFirst({
    where: { userid, propertyid, clockedin },
  });
  if (!timesheet) {
    timesheet = await prisma.timesheets.create({
      data: { userid, propertyid, clockedin, clockedout },
    });
  }
  return timesheet;
}

async function findOrCreateChecklistItem({ propertyid, taskdescription, isactive }) {
  let item = await prisma.checklistitems.findFirst({
    where: { propertyid, taskdescription },
  });
  if (!item) {
    item = await prisma.checklistitems.create({
      data: { propertyid, taskdescription, isactive },
    });
  }
  return item;
}

async function findOrCreateChecklistSubmission({ timesheetid, checklistitemid, photourl, completedat }) {
  let submission = await prisma.checklistsubmissions.findFirst({
    where: { timesheetid, checklistitemid, photourl },
  });
  if (!submission) {
    submission = await prisma.checklistsubmissions.create({
      data: { timesheetid, checklistitemid, photourl, completedat },
    });
  }
  return submission;
}

async function main() {
  console.log('Seeding sample data for final_project...');

  const adminPassword = await bcrypt.hash('AdminPass123!', 10);
  const managerPassword = await bcrypt.hash('ManagerPass123!', 10);
  const porterPassword = await bcrypt.hash('PorterPass123!', 10);

  const admin = await prisma.users.upsert({
    where: { email: 'admin@example.com' },
    update: {
      name: 'Admin User',
      password: adminPassword,
      phonenumber: '555-010-0000',
      role: 'ADMIN',
      schedule: { monday: '08:00-16:00', tuesday: '08:00-16:00' },
    },
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      phonenumber: '555-010-0000',
      role: 'ADMIN',
      schedule: { monday: '08:00-16:00', tuesday: '08:00-16:00' },
    },
  });

  const manager = await prisma.users.upsert({
    where: { email: 'manager@example.com' },
    update: {
      name: 'Manager User',
      password: managerPassword,
      phonenumber: '555-020-0000',
      role: 'MANAGER',
      schedule: { wednesday: '09:00-17:00', thursday: '09:00-17:00' },
    },
    create: {
      name: 'Manager User',
      email: 'manager@example.com',
      password: managerPassword,
      phonenumber: '555-020-0000',
      role: 'MANAGER',
      schedule: { wednesday: '09:00-17:00', thursday: '09:00-17:00' },
    },
  });

  const porter = await prisma.users.upsert({
    where: { email: 'porter@example.com' },
    update: {
      name: 'Porter User',
      password: porterPassword,
      phonenumber: '555-030-0000',
      role: 'PORTER',
      schedule: { friday: '07:00-15:00' },
    },
    create: {
      name: 'Porter User',
      email: 'porter@example.com',
      password: porterPassword,
      phonenumber: '555-030-0000',
      role: 'PORTER',
      schedule: { friday: '07:00-15:00' },
    },
  });

  const downtownResidence = await findOrCreateProperty({
    name: 'Downtown Residence',
    address: '100 Main Street, Suite 101',
    starttime: '08:00',
  });

  const lakesideSuites = await findOrCreateProperty({
    name: 'Lakeside Suites',
    address: '240 Lake Avenue',
    starttime: '09:00',
  });

  const porterTimesheet = await findOrCreateTimesheet({
    userid: porter.id,
    propertyid: downtownResidence.id,
    clockedin: new Date('2026-05-08T08:00:00.000Z'),
    clockedout: new Date('2026-05-08T16:00:00.000Z'),
  });

  const managerTimesheet = await findOrCreateTimesheet({
    userid: manager.id,
    propertyid: lakesideSuites.id,
    clockedin: new Date('2026-05-09T09:00:00.000Z'),
    clockedout: new Date('2026-05-09T17:00:00.000Z'),
  });

  const firstChecklistItem = await findOrCreateChecklistItem({
    propertyid: downtownResidence.id,
    taskdescription: 'Inspect lobby lights and vacuum common areas',
    isactive: true,
  });

  const secondChecklistItem = await findOrCreateChecklistItem({
    propertyid: lakesideSuites.id,
    taskdescription: 'Check door locks and replenish hand sanitizer',
    isactive: true,
  });

  await findOrCreateChecklistSubmission({
    timesheetid: porterTimesheet.id,
    checklistitemid: firstChecklistItem.id,
    photourl: 'https://example.com/photos/poster-cleaning-1.jpg',
    completedat: new Date('2026-05-08T10:30:00.000Z'),
  });

  await findOrCreateChecklistSubmission({
    timesheetid: managerTimesheet.id,
    checklistitemid: secondChecklistItem.id,
    photourl: 'https://example.com/photos/sanitizer-check-1.jpg',
    completedat: new Date('2026-05-09T11:45:00.000Z'),
  });

  console.log('Sample data seeded successfully.');
  console.log('Admin credentials: admin@example.com / AdminPass123!');
  console.log('Manager credentials: manager@example.com / ManagerPass123!');
  console.log('Porter credentials: porter@example.com / PorterPass123!');
  console.log('Use /api/auth/login to retrieve a JWT token for protected endpoints.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
