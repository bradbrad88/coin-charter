import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Link } from "react-router-dom";

interface Proptypes {
  chart: Chart;
  imageHeight?: number;
  width?: number;
}

const ChartListItem = ({ chart, imageHeight, width }: Proptypes) => {
  return (
    <li
      style={{ width: width ? width : "100%" }}
      className="h-full inline-block cursor-pointer hover:bg-indigo-100 ease-in-out duration-300"
    >
      <Link to={`/chart/${chart._id}`}>
        <div>
          <div className="flex place-content-between">
            <h1 className="truncate font-semibold text-md text-gray-800 capitalize">
              {chart.chartTitle}
            </h1>
            <div className="inline-flex gap-1">
              <div className="flex">
                <p className="text-[10px] text-center">
                  {chart.upVotes.length}
                </p>
                <IoIosArrowRoundUp className="text-green-500" />
              </div>
              <div className="flex">
                <p className="text-[10px] text-center">
                  {chart.downVotes.length}
                </p>
                <IoIosArrowRoundDown className="text-red-500" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="grid-flow-col">
              <h1 className="truncate font-bold text-sm uppercase text-indigo-600">
                {chart.coinName}
              </h1>
              <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
                By {chart.username}
              </p>
            </div>
            <p className="text-gray-500 text-xs whitespace-normal text-right mt-auto">
              Posted On: {chart.createdAt}
            </p>
          </div>
        </div>
        <img
          style={{ height: imageHeight ? imageHeight : "fit" }}
          src={chart.imageThumbnail}
          className="w-full rounded-sm"
        />
      </Link>
    </li>
  );
};

export default ChartListItem;
