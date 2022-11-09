import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Button from "./Button";
import useFetch, { Config } from "hooks/useFetch";
import useUser from "contexts/UserContext";
import { useRef, useState, useEffect } from "react";

interface PropTypes {
  coin: CoinType;
}

type Sizes = {
  thumbnail: string;
  medium: string;
  small: string;
};

interface ImageDataState {
  thumbnail: string;
  medium: string;
  small: string;
}

const FormInput = ({ coin }: PropTypes) => {
  const [description, setDescription] = useState<string>();
  const [imageData, setImageData] = useState<ImageDataState>({
    thumbnail: "",
    medium: "",
    small: "",
  });

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
    setImageData(res);
    return res;
  };

  const symbol = coin.symbol;

  const callData = {
    coinName: symbol,
    chartDescription: description,
    imageThumbnail: imageData.thumbnail,
    imageMedium: imageData.medium,
    imageSmall: imageData.small,
  };

  console.log(callData);
  return (
    <form className="flex flex-col w-[300px] gap-2">
      <input type="file" ref={inputRef} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
