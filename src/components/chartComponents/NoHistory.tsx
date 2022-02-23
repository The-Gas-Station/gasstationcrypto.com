import IframeResizer from 'iframe-resizer-react';
type chartChoice = {
  chartChoice: string;
};
export const NoHistory = ({ chartChoice }: chartChoice) => {
  return <IframeResizer log src={chartChoice} autoResize />;
};
export default NoHistory;
