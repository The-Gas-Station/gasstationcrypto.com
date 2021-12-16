import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export const AllNetworkList = (props: any) => {
  const { items } = props;
  const { title, tvl, liquidity, icon, launchDate } = items;

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <div className="avatar">
            <img src={icon} alt="icon" />
          </div>
          {title}
        </div>
        <div className="card-body">
          <MDBCarousel showControls interval={10000}>
            <MDBCarouselInner>
              <MDBCarouselItem className="active">
                {tvl && (
                  <p className="card-text">
                    <small>TVL</small>
                    {tvl}
                  </p>
                )}

                {launchDate && (
                  <p className="card-text">
                    <span className="comming-soon">Comming Soon</span>
                  </p>
                )}

                <hr />
                {launchDate && (
                  <p className="card-text">
                    <small>LAUNCH DATE</small>
                    {launchDate}
                  </p>
                )}
                {liquidity && (
                  <p className="card-text">
                    <small>LIQUIDITY</small>
                    {liquidity}
                  </p>
                )}
              </MDBCarouselItem>
              <MDBCarouselItem>
                {tvl && (
                  <p className="card-text">
                    <small>TVL</small>
                    {tvl}
                  </p>
                )}
                {launchDate && (
                  <span className="comming-soon">Comming Soon</span>
                )}
                <hr />
                {launchDate && (
                  <p className="card-text">
                    <small>LAUNCH DATE</small>
                    {launchDate}
                  </p>
                )}
                {liquidity && (
                  <p className="card-text">
                    <small>LIQUIDITY</small>
                    {liquidity}
                  </p>
                )}
              </MDBCarouselItem>
              <MDBCarouselItem>
                {tvl && (
                  <p className="card-text">
                    <small>TVL</small>
                    {tvl}
                  </p>
                )}
                {launchDate && (
                  <span className="comming-soon">Comming Soon</span>
                )}
                <hr />
                {launchDate && (
                  <p className="card-text">
                    <small>LAUNCH DATE</small>
                    {launchDate}
                  </p>
                )}
                {liquidity && (
                  <p className="card-text">
                    <small>LIQUIDITY</small>
                    {liquidity}
                  </p>
                )}
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </div>
      </div>
    </>
  );
};

export default AllNetworkList;
