import useMyNFPs from '../../hooks/useMyNFPs';
import FlipCard from './FlipCard';
import { CHAIN_INFO } from '../../configs';
import Stats from './Stats';
export const MyPatron = () => {
  const myNFPs = useMyNFPs();

  return (
    <>
      {myNFPs.map((metadata, i) => (
        <div key={i} className="col-4 col-sm-4 col-md-4 col-lg-3">
          <div className="card-items">
            <FlipCard
              children0={<img src={metadata.} />}
              stats={
                <Stats
                  stat0={'auu'}
                  stat1={'ss'}
                  stat2={'ee'}
                  stat3={'sdf'}
                  stat4={'fff'}
                  statTitle0={'wat'}
                  statTitle1={'casd'}
                  statTitle2={'123asd'}
                  statTitle3={'asdf'}
                  statTitle4={'asdfsaf'}
                />
              }
            />
            <div className="card-item-details">
              <h2>{metadata.name.replace(` #${metadata.tokenId}`, '')}</h2>
              <small> #{metadata.tokenId}</small>
              <img
                src={CHAIN_INFO[metadata.chainId].tokenImage.replace(
                  '/public/',
                  '/',
                )}
                style={{ maxHeight: 40 }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default MyPatron;
