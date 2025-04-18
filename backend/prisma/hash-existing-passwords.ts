import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.password.startsWith('$2b$')) continue;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log(`Updated user: ${user.email}`);
  }
}

main()
  .then(() => {
    console.log('Done hashing existing passwords!');
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
