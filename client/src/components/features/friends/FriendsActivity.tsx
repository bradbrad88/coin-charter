const data = [
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
  },
  {
    name: "Sam March",
    activity: "Commented on a cchart: Cardano",
  },
  {
    name: "Brad Teague",
    activity: "Newly Added Friend: Sam March",
  },
  {
    name: "Sally Peterson",
    activity: "Posted a New Chart: Binance",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
  },
  {
    name: "Rachel Default",
    activity: "Commented on a coin: Bitcoin",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
  },
];

// ? for activity- Commented on a coin, commented on a chart, favourited a coin, newly added friend, upvoted/downvoted a comment, upvoted/downvoted a chart, posted a new chart, posted a new comment

const FriendsActivity = () => {
  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-2/6 h-[600px]">
      <h1 className="text-xl font-bold">Friends Activity</h1>
      <ul className="border-solid border-2 border-black w-full h-full flex flex-col">
        {data.map((info) => (
          <li className="border-b flex w-full h-[35px] justify-between items-center px-2">
            <h1 className="font-bold text-indigo-600 hover:cursor-pointer hover:text-indigo-300">
              {info.name}
            </h1>
            <p>{info.activity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsActivity;
