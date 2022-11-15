import { CoinType } from "pages/CoinProfile";
import Button from "common/Button";
import useFetch, { Config } from "hooks/useFetch";
import useUser from "contexts/UserContext";
import { useRef, useState, useEffect } from "react";
import { ADD_CHART } from "src/graphql/queries";
import { useMutation } from "@apollo/client";
import Container from "src/components/common/Container";

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
  const [title, setTitle] = useState<string>("");
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
        chartTitle: title,
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
    <Container>
      <form className="flex w-full justify-between p-5">
        <div className="flex flex-col w-full p-5 gap-4">
          <input
            type="text"
            placeholder="Chart Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm border border-solid border-gray-300 rounded p-1"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Chart Description Here"
            className="w-full text-sm border border-solid border-gray-300 rounded p-1"
          ></textarea>
        </div>
        <div className="flex flex-col justify-between p-5">
          <input type="file" ref={inputRef} />
          <Button loading={working} onClick={downloadFile}>
            Upload
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default FormInput;
