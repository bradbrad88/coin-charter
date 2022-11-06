const data = [
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Sam March",
    activity: "Commented on a cchart: Cardano",
    date: "12/02/21",
  },
  {
    name: "Brad Teague",
    activity: "Newly Added Friend: Sam March",
    date: "12/02/21",
  },
  {
    name: "Sally Peterson",
    activity: "Posted a New Chart: Binance",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Rachel Default",
    activity: "Commented on a coin: Bitcoin",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Rachel Default",
    activity: "Commented on a coin: Bitcoin",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Rachel Default",
    activity: "Commented on a coin: Bitcoin",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Rachel Default",
    activity: "Commented on a coin: Bitcoin",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
  {
    name: "Ben Smerd",
    activity: "Commented on a coin: Ethereum",
    date: "12/02/21",
  },
];

// ? for activity- Commented on a coin, commented on a chart, favourited a coin, newly added friend, upvoted/downvoted a comment, upvoted/downvoted a chart, posted a new chart, posted a new comment

const FriendsActivity = () => {
  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-[95%] md:w-2/6 h-[400px] md:h-[600px] ">
      <h1 className="text-xl font-bold">Friends Activity</h1>
      <ul className="w-full h-full flex flex-col overflow-y-auto">
        {data.map((info) => (
          <li className="border-b flex w-full h-[40px] justify-between items-center group hover:bg-indigo-100 hover:cursor-pointer md:h-[80px]">
            <div className="flex flex-col">
              <h1 className="font-bold text-sm text-indigo-600 hover:cursor-pointer word-wrap">
                {info.name}
              </h1>
              <p className="text-xs text-gray-500">Date: {info.date}</p>
            </div>

            <p className="text-sm">{info.activity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsActivity;
