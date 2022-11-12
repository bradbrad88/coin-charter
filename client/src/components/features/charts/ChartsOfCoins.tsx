import Container from "src/components/common/Container";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

const coinOption = ["Top Rated", "Most Recent", "Oldest", "Least Rated"];
const data = [
  {
    title: "This is what i see happening this month",
    name: "Ben Smerd",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "We are going UP!",
    name: "Brad Teague",
    upVotes: 3203,
    downVotes: 2,
    createdAt: "21/03/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "Going DOWN!",
    name: "Sam March",
    upVotes: 1022,
    downVotes: 1223,
    createdAt: "24/12/2020",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This i think will happen very soon in this market",
    name: "Sally Peterson",
    upVotes: 1230,
    downVotes: 122,
    createdAt: "04/05/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This is what i see happening this month",
    name: "Ben Smerdsssssssss",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
];

const ChartsOfCoins = () => {
  return (
    <Container>
      <div className="flex flex-col h-[880px]">
        <form className="p-5 sticky top-0 bg-white border-b border-t lg:static">
          <h1 className="font-bold text-center ">
            View Charts For:{" "}
            <span className="italic font-semibold">Bitcoin</span>
          </h1>
          <div className="flex justify-center gap-5 p-5">
            <input
              type="text"
              value="Search Coin"
              className="border-black-50 border-2 rounded-full p-1 text-center"
            />
            <select>
              {coinOption.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </form>
        <ul className="flex flex-col gap-1 h-full w-full overflow-y-scroll scrollbar hover:scrollbar-track-slate-200">
          {data.map((info, index) => (
            <li
              className=" hover:bg-indigo-100 hover:border-indigo-100 hover:cursor-pointer flex flex-col p-2"
              key={info.name + index}
            >
              <div className="flex justify-between">
                <div className="flex flex-col w-5/6 h-[50px] gap-1">
                  <h1 className="truncate font-bold text-md text-indigo-600">
                    {info.title}
                  </h1>
                  <div className="flex justify-between">
                    <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
                      By {info.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Posted On: {info.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <IoIosArrowRoundUp className="text-green-500" />
                  <p className="text-[8px]">{info.upVotes}</p>
                </div>
                <div className="flex flex-col">
                  <IoIosArrowRoundDown className="text-red-500" />
                  <p className="text-[8px]">{info.downVotes}</p>
                </div>
              </div>
              <img src={info.chart} className="w-full h-[120px] rounded-sm" />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ChartsOfCoins;
