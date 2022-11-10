import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Button from "./Button";
import useFetch, { Config } from "hooks/useFetch";
import useUser from "contexts/UserContext";
import { useRef, useState, useEffect } from "react";
import { ADD_CHART } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

interface PropTypes {
  coin: CoinType;
}

type Sizes = {
  thumbnail: string;
  medium: string;
  small: string;
};

interface DataState {
  coinName: string;
  chartDescription: string;
  imageThumbnail: string;
  imageMedium: string;
  imageSmall: string;
}

const FormInput = ({ coin }: PropTypes) => {
  const symbol = coin.symbol;
  const [chartData, setChartData] = useState<DataState>({
    coinName: symbol,
    chartDescription: "",
    imageThumbnail: "",
    imageMedium: "",
    imageSmall: "",
  });
  const [addChart, { error }] = useMutation(ADD_CHART);

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
    console.log(chartData);
    setChartData({
      coinName: chartData.coinName,
      chartDescription: chartData.chartDescription,
      imageThumbnail: res.thumbnail,
      imageMedium: res.medium,
      imageSmall: res.small,
    });
    // setImageData(res);
    console.log("images uploaded");
    submitData();
    return res;
  };

  const submitData = () => {
    console.log(chartData);
    console.log("submission");
  };
  console.log(chartData);

  //TODO the callData object has all info and now just need to add in the ADD_CHART mutation into a function for a click event, need to figure out how to get click event to trigger it

  return (
    <form className="flex flex-col w-[300px] gap-2">
      <input type="file" ref={inputRef} />
      <textarea
        value={chartData.chartDescription}
        onChange={(e) =>
          setChartData({
            coinName: chartData.coinName,
            chartDescription: e.target.value,
            imageThumbnail: chartData.imageThumbnail,
            imageMedium: chartData.imageMedium,
            imageSmall: chartData.imageSmall,
          })
        }
        rows={5}
        placeholder="Chart Description Here"
      ></textarea>
      <Button onClick={downloadFile}>Upload Chart</Button>
    </form>
  );
};

const Chart = ({ coin }: PropTypes) => {
  return (
    <div className="flex flex-col gap-7 rounded-sm shadow-lg shadow-gray-400 p-5 pb-7 m-5 w-[95%] lg:w-[97%] lg:h-[900px]">
      <AdvancedRealTimeChart
        theme="dark"
        height={600}
        width={1400}
        // autosize
        symbol={`${coin.symbol.toUpperCase()}USDT`}
        show_popup_button
        details
      ></AdvancedRealTimeChart>
      <FormInput coin={coin} />
    </div>
  );
};

export default Chart;
