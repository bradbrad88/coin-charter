const userSeed = [
  {
    username: "Bennyboy",
    password: "12345678",
    subTitle: "Beginner Crypto",
    email: "bennyboy@google.com",
    bio: "I am a beginner trader and enjoy searching up new crypto coins",
  },
  {
    username: "Braddy",
    password: "12345678",
    subTitle: "Lover of coins",
    email: "braddy@test.com",
    bio: "I am very excited to learn more about how charts work and start using them more.",
  },
  {
    username: "Sammy",
    password: "12345678",
    subTitle: "Expertish",
    email: "sammy@google.com",
    bio: "Crypto is very interesting and i am keen to get into the space.",
  },
];

const coinSeed = [
  {
    coinId: "bitcoin",
    coinName: "Bitcoin",
    symbol: "btc",
    image: "http://something",
  },
  {
    coinId: "1x-short-bitcoin-cash-token",
    symbol: "bchhedge",
    coinName: "1X Short Bitcoin Cash Token",
  },
  {
    coinId: "2omb-finance",
    symbol: "2omb",
    coinName: "2omb",
  },
];

const chartSeed = [
  {
    coinId: "bitcoin",
    coinName: "Bitcoin",
    symbol: "btc",
    chartTitle: "My first chart",
    chartDescription:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quasi recusandae volufugit asperiores. Ea, consequatur?",
    imageThumbnail:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc4ae6ab4e-5167-46f8-9860-e20492d2472ethumbnail.avif",
    imageMedium:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btccba1bd9a-b27c-4903-a80c-cd562c7135b7medium.avif",
    imageSmall:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc705b2647-dc22-4df0-b40b-fd981d802971small.avif",
  },
  {
    coinId: "bitcoin",
    coinName: "Bitcoin",
    symbol: "btc",
    chartTitle: "Bitcoin done",
    chartDescription:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quasi recusandae voluptates r delectus quidem in sapiente doloribus dicta, fugit asperiores. Ea, consequatur?",
    imageThumbnail:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc4ae6ab4e-5167-46f8-9860-e20492d2472ethumbnail.avif",
    imageMedium:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btccba1bd9a-b27c-4903-a80c-cd562c7135b7medium.avif",
    imageSmall:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc705b2647-dc22-4df0-b40b-fd981d802971small.avif",
  },
  {
    coinId: "bitcoin",
    coinName: "Bitcoin",
    symbol: "btc",
    chartTitle: "Im excited",
    chartDescription:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quasi recusandae voluptates rationconsequatur?",
    imageThumbnail:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc4ae6ab4e-5167-46f8-9860-e20492d2472ethumbnail.avif",
    imageMedium:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btccba1bd9a-b27c-4903-a80c-cd562c7135b7medium.avif",
    imageSmall:
      "https://coin-charter.s3.ap-southeast-2.amazonaws.com/636c7f962e0c02f33ba29d48btc705b2647-dc22-4df0-b40b-fd981d802971small.avif",
  },
];

module.exports = { userSeed, coinSeed, chartSeed };
