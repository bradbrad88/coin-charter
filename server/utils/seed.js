// Import connection, models and seed data
const connection = require("../config/connection");
const { Users, Coins, Charts } = require("../models");
const { userSeed, coinSeed, chartSeed } = require("./data");

connection.on("error", (err) => err);

// Create connection and load seed data into the models
connection.once("open", async () => {
  console.log("Connected");
  await Coins.deleteMany({});

  const coinPromises = coinSeed.map(async (coin) => {
    return await Coins.create(coin);
  });

  const coins = await Promise.all(coinPromises);

  // Drop any existing documents from models
  await Users.deleteMany({});

  // Insert new dataseed into models

  const userPromises = userSeed.map(async (user) => {
    return await Users.create({
      ...user,
      favCoins: [{ coin: coins[Math.floor(Math.random() * coins.length)] }],
    });
  });

  const users = await Promise.all(userPromises);

  const friendPromises = users.map(async (user, idx) => {
    const id = users[(idx + 1) % users.length]._id;
    return await user.updateOne(
      {
        $push: {
          friends: {
            $each: [{ friend: id }],
            $position: 0,
          },
        },
      },
      { timestamps: true, new: true },
    );
  });

  const newUsers = await Promise.all(friendPromises);

  await Charts.deleteMany({});

  const mappedCharts = chartSeed.map((chart) => {
    const { _id, username } = users[Math.floor(Math.random() * users.length)];
    return {
      ...chart,
      userId: _id,
      username,
    };
  });

  console.log(mappedCharts);
  await Charts.insertMany(mappedCharts);

  console.log("Seed complete");
  process.exit();
});
