import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CoinType } from "pages/CoinProfile";
import Container from "src/components/common/Container";

interface PropTypes {
  coin: CoinType;
}

const Chart = ({ coin }: PropTypes) => {
  return (
    <Container>
      <div className="w-full aspect-[14/9] md:aspect-auto md:h-full md:p-5 mb-2">
        <AdvancedRealTimeChart
          theme="dark"
          autosize={true}
          symbol={`${coin.symbol.toUpperCase()}USDT`}
          show_popup_button
          details
        ></AdvancedRealTimeChart>
      </div>
    </Container>
  );
};

export default Chart;
