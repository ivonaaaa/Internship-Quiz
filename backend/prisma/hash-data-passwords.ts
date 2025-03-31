import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function hashExistingPasswords() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.password) {
      const hashedPassword = await hash(user.password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      console.log(`User ${user.email} password updated!`);
    }
  }

  console.log('All passwords updated!');
}

hashExistingPasswords().catch((error) => {
  console.error('Error updating passwords:', error);
});
