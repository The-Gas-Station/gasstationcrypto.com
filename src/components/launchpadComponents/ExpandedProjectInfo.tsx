import { MDBModal } from 'mdb-react-ui-kit';
import Staking from '../launchpadComponents/pppcard/Staking';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import discord from '../launchpadComponents/pppcard/assets/discord.svg';
import twitter from '../launchpadComponents/pppcard/assets/twitter.svg';
import reddit from '../launchpadComponents/pppcard/assets/reddit.svg';
import web from '../launchpadComponents/pppcard/assets/web.svg';
import telegram from '../launchpadComponents/pppcard/assets/telegram.svg';
import network from '../launchpadComponents/pppcard/assets/network.svg';

type modalOpen = {
  showExpandedProjectInfo: boolean;
  setExpandedProjectInfo: any;
  closeExpandedProjectInfo: any;
  stakingProps: Record<string, string>;
};

export const ExpandedProjectInfo = ({
  showExpandedProjectInfo,
  setExpandedProjectInfo,
  closeExpandedProjectInfo,
  stakingProps,
}: modalOpen) => {
  return (
    <MDBModal
      show={showExpandedProjectInfo}
      className="BridgeTx-modal"
      setShow={setExpandedProjectInfo}
    >
      <div className="flex-column card-list">
        <div className="darkrow">
          <p onClick={closeExpandedProjectInfo}>
            <IoArrowBackCircleOutline />
          </p>
          <p onClick={closeExpandedProjectInfo}>LAUNCHPAD HOME</p>
          <span>//</span>
          <span>New Project</span>
          <div className="wallet">connected: 0x0000....0000</div>
        </div>

        <div className="spacearoundrow">
          <div className="ppp-card">
            <img src="https://via.placeholder.com/175x175" className="imgtop" />
            <Staking stakingProps={stakingProps} />
          </div>
          <div className="col-lg-8">
            <div className="newprojectblock">
              <div className="head">
                <p>New Project Overview</p>
                <img src={network} />
              </div>
              <div className="btn-row">
                <img src={web} />
                <img src={twitter} />
                <img src={discord} />
                <img src={telegram} />
                <img src={reddit} />
              </div>
              <div className="paragraph">
                <p>
                  Vivamus sollicitudin elit sit amet fermentum tincidunt. Aenean
                  porta consectetur lorem, ac molestie felis iaculis vitae.
                  Phasellus purus odio, varius semper nibsh nec, fermentum
                  finibus est. Nullam venenatis varius sempermol Vivamus
                  sollicitudin elit sit amet fermentum tincidunt. Aenean porta
                  consectetur lorem, ac molestie felis iaculis vitae. Phasellus
                  purus odio, varius semper nibsh nec, fermentum finibus est.
                  Nullam venenatis varius sempermol
                </p>
              </div>
              <div className="body">
                <div className="block">
                  <h6 className="title-7">Pool Details</h6>

                  <div className="item">
                    <p className="l">Swap Rate:</p>
                    <p className="r">1 BUSD = 5 NEW | 1 NEW = 0.2 BUSD</p>
                  </div>
                  <div className="item">
                    <p className="l">Raise Start:</p>
                    <p className="r">8 FEB 2022 11:00AM UTC</p>
                  </div>
                  <div className="item">
                    <p className="l">Raise End:</p>
                    <p className="r">9 FEB 2022 16:00PM UTC</p>
                  </div>
                  <div className="item">
                    <p className="l">Registration:</p>
                    <p className="r">6 FEB 2022 11:00AM-16:00PM UTC</p>
                  </div>
                  <div className="item">
                    <p className="l">Base Allocation:</p>
                    <p className="r">1x = $20.87</p>
                  </div>
                  <h6 className="title-7">Distribution</h6>
                  <div className="item">
                    <p className="l">Distribution:</p>
                    <p className="r">Claimed on Gas Station</p>
                  </div>
                  <div className="item">
                    <p className="l">Vesting:</p>
                    <p className="r">
                      8% at TGE and linear release over one year
                    </p>
                  </div>
                </div>

                <div className="block">
                  <h6 className="title-7">Token Metrics</h6>
                  <div className="item">
                    <p className="l">Ticker:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Network:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Total Supply:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Project Valuation:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Initial Token Circulation:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Initial Market Cap:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Public SHO:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">DAO Round:</p>
                    <p className="r">NEW</p>
                  </div>
                  <div className="item">
                    <p className="l">Individual Allocation:</p>
                    <p className="r">NEW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MDBModal>
  );
};
export default ExpandedProjectInfo;
