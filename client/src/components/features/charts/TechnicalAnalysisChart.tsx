import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Container from "src/components/common/Container";

interface PropTypes {
  coin: CoinType;
}

const Chart = ({ coin }: PropTypes) => {
  return (
    <Container>
      <div className="w-full h-fit p-5">
        <AdvancedRealTimeChart
          theme="dark"
          height={500}
          width="full"
          // autosize={true}
          symbol={`${coin.symbol.toUpperCase()}USDT`}
          show_popup_button
          details
        ></AdvancedRealTimeChart>
      </div>
    </Container>
  );
};

export default Chart;
