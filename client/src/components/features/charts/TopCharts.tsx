import Container from "src/components/common/Container";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/Io";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/Tfi";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { QUERY_ALL_CHARTS } from "src/graphql/queries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface ChartsDataTypes {
  _id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  chartTitle: string;
  chartDescription: string;
  username: string;
  userId: string;
  imageThumbnail: string;
  imageMedium: string;
  imageSmall: string;
  upVotes: number;
  downVotes: number;
  createdAt: number;
}

const MostRecent = () => {
  const [topCharts, setTopCharts] = useState<any>([]);
  const { loading, error, data } = useQuery(QUERY_ALL_CHARTS);
  const ref = useRef<HTMLUListElement>(null);

  const renderChartItems = () => {
    return data.map((item) => <ChartItem info={item} />);
  };

  const slideLeft = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft - 300;
  };

  const slideRight = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft + 300;
  };

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
      <div className="">
        <h1 className="font-bold text-lg text-center p-5 bg-white border-b border-t">
          Top Charts
        </h1>
        <div className="relative h-[240px]">
          <ul
            ref={ref}
            className="h-full w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth"
          >
            {renderChartItems()}
          </ul>
          <TfiArrowCircleLeft
            onClick={slideLeft}
            className="absolute top-1/2 left-0 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
          <TfiArrowCircleRight
            onClick={slideRight}
            className="absolute top-1/2 right-0 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default MostRecent;

interface ChartItem {
  title: string;
  name: string;
  coin: string;
  upVotes: number;
  downVotes: number;
  createdAt: string;
  chart: string;
}

interface ChartItemProps {
  info: ChartItem;
}

const ChartItem = ({ info }: ChartItemProps) => {
  return (
    <li className="w-[300px] h-full inline-block p-2 cursor-pointer hover:bg-indigo-100 ease-in-out duration-300">
      <div>
        <h1 className="truncate font-bold text-md text-indigo-600">
          {info.title}
        </h1>
        <div className="inline-flex">
          <div className="grid-flow-col">
            <h1 className="truncate font-bold text-sm">{info.coin}</h1>
            <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
              By {info.name}
            </p>
          </div>
          <div className="grid-flow-col">
            <p className="text-gray-500 text-xs whitespace-normal">
              Posted On: {info.createdAt}
            </p>
            <div className="flex justify-center gap-2">
              <div className="">
                <IoIosArrowRoundUp className="text-green-500" />
                <p className="text-[8px]">{info.upVotes}</p>
              </div>
              <div className="">
                <IoIosArrowRoundDown className="text-red-500" />
                <p className="text-[8px]">{info.downVotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src={info.chart}
        className="w-full h-[120px] rounded-sm snap-center"
      />
    </li>
  );
};
