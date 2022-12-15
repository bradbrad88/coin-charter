const prisma = require("../config/connection");
const { userSeed } = require("./data");

async function main() {
  await prisma.user.deleteMany();

  const users = await Promise.all(
    userSeed.map(async (user) => {
      const newUser = await prisma.user.create({ data: user });
      return newUser;
    }),
  );

  await prisma.user.update({
    where: { id: users[0].id },
    data: {
      UserFriends: { create: { friendId: users[1].id } },
      friends: { create: { userId: users[1].id } },
    },
  });

  await prisma.user.update({
    where: { id: users[2].id },
    data: {
      UserFriends: { create: { friendId: users[0].id } },
      friends: { create: { userId: users[0].id } },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
