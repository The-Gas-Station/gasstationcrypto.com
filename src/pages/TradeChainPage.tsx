import SwapCard from '../components/swapComponents/swapCard';
import ChartBlock from '../components/chartComponents/ChartBlock';

export const TradeChainPage = () => {
  return (
    <>
      <div className="desktop-mobile-switch">
        <ChartBlock />
        <SwapCard />
      </div>
    </>
  );
};

export default TradeChainPage;
