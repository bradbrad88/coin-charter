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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [addChart, { error, data }] = useMutation(ADD_CHART);

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

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };
  const validSubmit = imageFile && title && description;

  const downloadFile = async () => {
    if (!validSubmit) return;
    const data = new FormData();
    data.append("image", imageFile);

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
      <form className="flex flex-col md:flex-row w-full md:justify-between p-5 gap-3">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-xl font-semibold text-gray-500 text-left">
            Create Your Own Analysis
          </h1>
          <div>
            <label>
              Chart Title
              <input
                type="text"
                placeholder="Chart Title Here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-solid border-gray-300 rounded p-1"
              />
            </label>
          </div>
          <div>
            <label>
              Chart Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Chart Description Here"
                className="w-full border border-solid border-gray-300 rounded block p-1"
              ></textarea>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <input type="file" onChange={onImageChange} className="mt-auto" />
          <Button
            loading={working}
            disabled={!validSubmit}
            onClick={downloadFile}
          >
            Post Your Analysis
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default FormInput;
