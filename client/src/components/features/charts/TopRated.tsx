import Container from "src/components/common/Container";
import { IoIosArrowRoundUp } from "react-icons/Io";
import { IoIosArrowRoundDown } from "react-icons/Io";

const TopRated = () => {
  return (
    <Container>
      <div className="p-5">
        <div>
          <h1 className="text-lg font-bold text-center">Top Rated Charts</h1>
          <h1 className="text-lg font-semibold text-center">Ethereum</h1>
        </div>
        <div className="flex gap-3 items-center">
          <h1 className="font-bold text-md text-indigo-600">
            Ethereum Is Going Down
          </h1>
          <p className="italic font-bold text-sm text-slate-500">
            By Ben Smerd
          </p>
          <div className="flex flex-row gap-3">
            <div>
              <IoIosArrowRoundUp className="text-green-500" />
              <p className="text-[8px]">121230</p>
            </div>
            <div>
              <IoIosArrowRoundDown className="text-red-500" />
              <p className="text-[8px]">51230</p>
            </div>
          </div>
        </div>
        <p>
          From my statistical analysis of the next 4 weeks combned with the
          price movement from the past 5 weeks i think that the price of
          ethereum will go down by 12% to this price point in red.
        </p>
      </div>
      <div className="">
        <img
          src="https://source.unsplash.com/random/?person/"
          className="max-h-[400px] w-full"
        />
      </div>
    </Container>
  );
};

export default TopRated;
