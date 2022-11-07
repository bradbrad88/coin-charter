import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Button from "./Button";
import useFetch, { Config } from "hooks/useFetch";
import useUser from "contexts/UserContext";

interface PropTypes {
  coin: CoinType;
}

const Chart = ({ coin }: PropTypes) => {
  const { postRequest } = useFetch();
  let { user } = useUser();

  const downloadFile = () => {
    const config: Config = { url: `/api/user/${user?._id}/chart/${symbol}` };
    postRequest(config);
  };

  const symbol = coin.symbol;
  return (
    <div className="flex flex-col gap-10 rounded-sm shadow-lg shadow-gray-400 p-5 pb-7 m-5 w-[95%] lg:w-[97%] lg:h-[750px]">
      <AdvancedRealTimeChart
        theme="dark"
        autosize
        symbol={`${symbol.toUpperCase()}USDT`}
        show_popup_button
        details
      ></AdvancedRealTimeChart>

      <form className="flex flex-col items-center">
        <input type="file" />
        <Button onClick={downloadFile}>Upload</Button>
      </form>
    </div>
  );
};

export default Chart;
