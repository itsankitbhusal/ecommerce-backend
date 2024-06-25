import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const user1 = await prisma.users.upsert({
  //   // if data is already there update else addnew
  // });
  // ...
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
