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

interface ImageDataState {
  thumbnail: string;
  medium: string;
  small: string;
}

const FormInput = ({ coin }: PropTypes) => {
  const symbol = coin.symbol;
  const coinId = coin.id;
  const coinName = coin.name;

  const [imageData, setImageData] = useState<ImageDataState>({
    thumbnail: "",
    medium: "",
    small: "",
  });
  const [description, setDescription] = useState<string>("");
  const [addChart, { error, data }] = useMutation(ADD_CHART);

  const inputRef = useRef<HTMLInputElement>(null);
  const { postRequest, working } = useFetch();
  let { user } = useUser();

  useEffect(() => {
    if (imageData.thumbnail && imageData.medium && imageData.small) {
      const variables = {
        coinId,
        coinName,
        symbol,
        chartDescription: description,
        imageThumbnail: imageData.thumbnail,
        imageMedium: imageData.medium,
        imageSmall: imageData.small,
      };

      addChart({
        variables,
      });
    }
  }, [imageData]);

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

  return (
    <form className="flex flex-col w-[300px] gap-2">
      <input type="file" ref={inputRef} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        placeholder="Chart Description Here"
      ></textarea>
      <Button loading={working} onClick={downloadFile}>
        Upload Chart
      </Button>
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
