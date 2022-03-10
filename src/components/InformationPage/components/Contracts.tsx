import FlexRow from '../../FlexRow';
type ContractProps = {
  title: string;
  img: string;
  contractAddress: string;
  lpAddress: any;
  patronTrue: boolean;
  patronAddress: string;
  tokenName: string;
  tokenHref: string;
  patronHref: string;
  tokenLock: string;
};
export const Contracts = ({
  title,
  img,
  contractAddress,
  lpAddress,
  patronTrue,
  patronAddress,
  tokenName,
  tokenHref,
  patronHref,
  tokenLock,
}: ContractProps) => {
  return (
    <>
      <div className="ContractCard">
        <FlexRow>
          <div className="networkTitle">{title}</div>
          <img src={img} />
        </FlexRow>
        <h1>{tokenName}</h1>
        <span>Total Suppy: 100,000,000,000 {tokenName}</span>
        <span>Contract Address:</span>
        <a href={tokenHref}>{contractAddress}</a>
        <span>LP Address:</span>
        <a>{lpAddress}</a>
        {patronTrue ? (
          <>
            <span>Patrons:</span>
            <a href={patronHref}>{patronAddress}</a>
          </>
        ) : null}
        <span>Team Token Lock:</span>
        <a>{tokenLock}</a>
      </div>
    </>
  );
};
