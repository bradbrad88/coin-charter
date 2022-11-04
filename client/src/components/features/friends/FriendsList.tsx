// import { Button } from "src/components/common/Button";
const data = [
  {
    profilePic: "https://source.unsplash.com/random/?person/",
    name: "Ben Smerd",
    subtitle: "Beginner trader",
    bio: "I really enhoy trading and just srated so im keen to continue doing it because I really enjoy it and it will be good to learn more from connecting ith people on this great amazingly fun awesome application built by 3 awesome guys.",
    friendsCount: 1234,
    chartsCount: 12,
    favCoinsCount: 302,
    recentActivity: [
      "Commented on Coin: Ethereum",
      "Comented on chart: Binance",
      "New Friend: Sam March",
      "Added to Favourites: Cardano",
    ],
  },
  {
    profilePic: "https://source.unsplash.com/random/?person/",
    name: "Sam March",
    subtitle: "Learning crypto trader",
    bio: "I just started and am keen to learn more",
    friendsCount: 12,
    chartsCount: 3,
    favCoinsCount: 32,
    recentActivity: [
      "Commented on Cchart: Ethereum",
      "Comented on coin: Binance",
      "New Friend: Sam March",
      "Commented on Coin: Cardano",
    ],
  },
  {
    profilePic: "https://source.unsplash.com/random/?person/",
    name: "Brad Teague",
    subtitle: "Expert trader",
    bio: "I love trading so much and really like Ethereum.",
    friendsCount: 12334,
    chartsCount: 122,
    favCoinsCount: 302,
    recentActivity: [
      "Commented on Coin: Ethereum",
      "Comented on chart: Binance",
      "New Friend: Sam March",
      "Added to Favourites: Cardano",
    ],
  },
];

const FriendsList = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-4/6 h-[600px]">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Friends List</h1>
        <h1>Friends: 2312</h1>
      </div>
      <ul className="flex flex-col gap-1 w-full h-full overflow-y-auto">
        {data.map((info) => (
          <li className="border-b w-full h-[100px] flex justify-start p-1">
            <div className="flex gap-1 w-full">
              <div className="flex w-2/6 gap-2">
                <img
                  src={info.profilePic}
                  className="h-[90px] w-[70px] rounded-lg"
                />
                <div className="flex flex-col leading-4 w-5/6">
                  <h1 className="font-bold text-md text-indigo-600">
                    {info.name}
                  </h1>
                  <p className="italic text-sm">{info.subtitle}</p>
                  <p className="text-sm w-full leading-4 overflow-y-auto">
                    {info.bio}
                  </p>
                </div>
              </div>
              <div className="flex w-2/6">
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">Friends #</p>
                  <p>{info.friendsCount}</p>
                </div>
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">Charts #</p>
                  <p>{info.chartsCount}</p>
                </div>
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">
                    Fav Coins #
                  </p>
                  <p>{info.favCoinsCount}</p>
                </div>
              </div>
              <div className=" w-2/6 h-full leading-4">
                <h1 className="font-bold text-md text-indigo-600">
                  Recent Activity
                </h1>
                <ul className="flex flex-col">
                  {info.recentActivity.map((activity) => (
                    <li>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
