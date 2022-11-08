import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Button from "./Button";
import useFetch, { Config } from "hooks/useFetch";
import useUser from "contexts/UserContext";
import { useRef } from "react";

interface PropTypes {
  coin: CoinType;
}

type Sizes = {
  thumbnail: string;
  medium: string;
  small: string;
};

const Chart = ({ coin }: PropTypes) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { postRequest } = useFetch();
  let { user } = useUser();

  const downloadFile = async () => {
    const image = inputRef.current?.files![0];
    const data = new FormData();
    data.append("image", image!);

    const config: Config = {
      data,
      url: `/api/user/${user?._id}/chart/${symbol}`,
    };

    const res = await postRequest<Sizes>(config);
    if (!res) {
      return;
    }

    console.log(res);
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
        <input type="file" ref={inputRef} />

        <Button onClick={downloadFile}>Upload</Button>
      </form>
    </div>
  );
};

export default Chart;
