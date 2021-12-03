import TopIcon from '../assets/NonFungible/page-header-icon.png';
import DownArrow from '../assets/NonFungible/down-arrow.png';
import Img_1 from '../assets/NonFungible/card-img-1.png';
import Right from '../assets/NonFungible/price-right.png';
import binicons from '../assets/NonFungible/bin-icons.png';
import CARD_ITEM_1 from '../assets/NonFungible/card-1.png';

export const NFPPage = () => {
  return (
    <>
      <section className="page-background">
        <div className="page-banner-top-title">
          <h3>
            <img src={TopIcon} alt="#" /> BSC Non-Fungible Patrons
          </h3>
          <select>
            <option>Switch Network</option>
          </select>
        </div>
        <div className="nfp-banner-center-text">
          <h4>Gas Station’s exclusive NFT assets</h4>
          <p>
            Non-Fungible Patrons (NFPs) give you ultimate perks on Gas Station’s
            Bridge. Like free transactions on the bridge or earning a pool of
            bridge transaction fees.
          </p>
          <div className="mint-nfps-btn">
            <h5>Mint NFPs</h5>
            <div className="arrow-with-select-type">
              <img src={DownArrow} alt="#" width="54" />
              <select>
                <option>Select Patron Type</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section className="nfp-card">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Common</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      075<span>/500</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src={Img_1} />
                <div className="price-block">
                  <h2>
                    $25 <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img src={Right} />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc">
                Common patrons are algrithmically generate NFTs. Own one to
                enjoy free transfers on Gas Station Bridge.
              </p>
              <div className="btn-blocks">
                <button className="custom-btn">Mint a Common</button>
                <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Common</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      075<span>/500</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src={Img_1} />
                <div className="price-block">
                  <h2>
                    $25 <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img src={Right} />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc">
                Common patrons are algrithmically generate NFTs. Own one to
                enjoy free transfers on Gas Station Bridge.
              </p>
              <div className="btn-blocks">
                <button className="custom-btn">Mint a Common</button>
                <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Common</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      075<span>/500</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src={Img_1} />
                <div className="price-block">
                  <h2>
                    $25 <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img src={Right} />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc">
                Common patrons are algrithmically generate NFTs. Own one to
                enjoy free transfers on Gas Station Bridge.
              </p>
              <div className="btn-blocks">
                <button className="custom-btn">Mint a Common</button>
                <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="collection-list px-15">
        <div className="title-main">
          <h5>My NFP Collection</h5>
          <p>
            We’re showing all NFPs in your current wallet on the BSC network.
            How do I see my other NFPs?
          </p>
        </div>
        <div className="row">
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <div className="card-items">
              <img src={CARD_ITEM_1} />
              <div className="card-item-details">
                <h2>Common Patron</h2>
                <small> #389</small>
                <img src={Right} />
              </div>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <div className="card-items">
              <img src={CARD_ITEM_1} />
              <div className="card-item-details">
                <h2>Common Patron</h2>
                <small> #389</small>
                <img src={Right} />
              </div>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <div className="card-items">
              <img src={CARD_ITEM_1} />
              <div className="card-item-details">
                <h2>Common Patron</h2>
                <small> #389</small>
                <img src={Right} />
              </div>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <div className="card-items">
              <img src={CARD_ITEM_1} />
              <div className="card-item-details">
                <h2>Common Patron</h2>
                <small> #389</small>
                <img src={Right} />
              </div>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <div className="card-items">
              <img src={CARD_ITEM_1} />
              <div className="card-item-details">
                <h2>Common Patron</h2>
                <small> #389</small>
                <img src={Right} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NFPPage;
