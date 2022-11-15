import TopCharts from "./TopCharts";
import OtherCharts from "./OtherCharts";
import { CoinType } from "src/pages/CoinProfile";
import Container from "src/components/common/Container";

interface PropTypes {
  coin: CoinType;
}

const CoinCharts = ({ coin }: PropTypes) => {
  const coinId = coin.id;
  return (
    <Container>
      <div className="flex flex-col p-5 gap-3">
        <TopCharts coinId={coinId} />
        <OtherCharts coinId={coinId} />
      </div>
    </Container>
  );
};

export default CoinCharts;
