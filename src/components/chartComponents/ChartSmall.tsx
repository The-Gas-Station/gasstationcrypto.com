import IframeResizer from 'iframe-resizer-react';
type chartChoice = {
  chartChoice: any;
};
export const ChartSmall = ({ chartChoice }: chartChoice) => {
  return <IframeResizer log src={chartChoice} className="chart-large" />;
};
export default ChartSmall;
