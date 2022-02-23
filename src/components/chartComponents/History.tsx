import IframeResizer from 'iframe-resizer-react';
type chartChoice = {
  chartChoice: any;
};
export const History = ({ chartChoice }: chartChoice) => {
  return (
    <IframeResizer
      log
      src={chartChoice}
      style={{
        minWidth: '330px',
        width: '100%',
        height: '95%',
      }}
    />
  );
};
export default History;
