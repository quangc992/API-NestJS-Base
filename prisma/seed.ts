import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // const authRegister = await prisma.clientAccount.create({
  //   data: {
  //     title: 'Prisma Client Just Became a Lot More Flexible',
  //     body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
  //     description: 'Đăng ký tài khoản',
  //     published: true,
  //   },
  // });
  // console.log({ authRegister });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
