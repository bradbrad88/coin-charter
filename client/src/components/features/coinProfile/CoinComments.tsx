import Comments from "./Comments";
import { CoinType } from "src/pages/CoinProfile";
import Container from "src/components/common/Container";

interface PropTypes {
  coin: CoinType;
}
const CoinComments = ({ coin }: PropTypes) => {
  const coinId = coin.id;
  const coinName = coin.name;

  return (
    <Container>
      <div className="flex flex-col p-5 h-[400px] md:h-full">
        <h1 className="text-xl font-semibold text-gray-500">Comments</h1>

        <Comments coinId={coinId} coinName={coinName} />
      </div>
    </Container>
  );
};

export default CoinComments;
