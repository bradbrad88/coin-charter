const data = [
  {
    title: "This is what i see happening this month",
    name: "Ben Smerd",
    coin: "DogeCooin",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "We are going UP!",
    name: "Brad Teague",
    coin: "Ethereum",
    upVotes: 3203,
    downVotes: 2,
    createdAt: "21/03/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "Going DOWN!",
    name: "Sam March",
    coin: "Avalanche",
    upVotes: 1022,
    downVotes: 1223,
    createdAt: "24/12/2020",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This i think will happen very soon in this market",
    name: "Sally Peterson",
    coin: "Theta",
    upVotes: 1230,
    downVotes: 122,
    createdAt: "04/05/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This is what i see happening this month",
    name: "Ben Smerdsssssssss",
    coin: "DogeCooin",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
];

const MostRecent = () => {
  return (
    <div className="flex flex-col w-2/6 h-full pl-2">
      <ul className="flex flex-col gap-1 h-[580px] w-full overflow-y-scroll">
        {data.map((info) => (
          <li className="group transition-all hover:bg-indigo-100 hover:rounded-lg hover:border-2 hover:border-indigo-100 hover:cursor-pointer flex flex-col p-2">
            <div className="flex justify-between">
              <div className="flex flex-col w-5/6 h-[80px] ">
                <h1 className="truncate font-bold text-md text-indigo-600">
                  {info.title}
                </h1>
                <h1 className="truncate font-bold text-sm">{info.coin}</h1>
                <div className="flex justify-between">
                  <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
                    By {info.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Posted On: {info.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-start pr-2 pt-2">
                <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                <p className="text-[8px]">{info.upVotes}</p>
              </div>
              <div className="flex flex-col justify-start pr-2 pt-2">
                <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                <p className="text-[8px]">{info.downVotes}</p>
              </div>
            </div>
            <img
              src={info.chart}
              className="w-full h-[120px] group-hover:brightness-75 rounded-md"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostRecent;
