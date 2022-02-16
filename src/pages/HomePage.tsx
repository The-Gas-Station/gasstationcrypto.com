import { useState } from 'react';
import { ethers } from 'ethers';
import numeral from 'numeral';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ImageRow from '../components/ImageRow';
import { MDBSwitch } from 'mdb-react-ui-kit';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import useWidth from '../hooks/useWidth';
import useCombinedTVL from '../hooks/useCombinedTVL';
import useGASTokenCombinedMarketCap from '../hooks/useGASTokenCombinedMarketCap';

import BannerSection from './home/BannerSection';
import BridgeSection from './home/BridgeSection';
import NetworkCard from '../components/NetworkCard';

import Gauge from '../assets/Gauge.svg';
import NFPToken from '../assets/NFPcolor.svg';
import GASToken from '../assets/GASToken.svg';
import burn from '../assets/fire.png';
import holder from '../assets/tokenholder.png';
import dev from '../assets/dev.png';
import gas from '../assets/gas.svg';
import fuel4 from '../assets/shield.svg';
import fuel5 from '../assets/wlt.svg';
import fuel6 from '../assets/spew.svg';
import pump from '../assets/Pump.svg';
import Slider from 'react-slick';
import legendaryArray from '../components/legendaryRandom';
import rareArray from '../components/rareRandom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { CHAIN_INFO } from '../configs';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const legendary = rand(0, legendaryArray.length - 1);
const rare = rand(0, rareArray.length - 1);
const settings1 = {
  dots: false,
  arrows: true,
  cssEase: 'ease-out',
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const HomePage = () => {
  const { readOnlyChainIds } = useConfig();
  const { currentChainId } = useWeb3ConnectionsContext();
  const [PatronOpen, setPatronOpen] = useState(true);
  const togglePatronOpen = () => setPatronOpen(!PatronOpen);
  const [UIOpen, setUI] = useState(true);
  const toggleUI = () => setUI(!UIOpen);
  const [FuelOpen, setFuel] = useState(true);
  const toggleFuel = () => setFuel(!FuelOpen);
  const { isTablet, isMobile } = useWidth();

  const combinedTVL = useCombinedTVL();
  const combinedMarketCap = useGASTokenCombinedMarketCap();

  const [sectionList] = useState([
    {
      title: 'Fuel Tanks',
      text: `Fuel Up! Earn GAS Tokens 
      between major crypto networks by staking
      in our Fuel Tanks. Staking for GAS Tokens, Native Ether, USDC,
      & More. Low Risk, High Reward! `,
      btnText: `Take Me There!`,
      img: Gauge,
      btnLink: '/#/hub',
    },
    {
      title: 'GAS Tokens',
      text: `The GAS Token is a dividend paying
      token that offers static rewards in the native
      ether per blockchain. Each network has a total 
      supply of 100B Gas Tokens. To earn ether rewards
      simply hold a minimum of 200,000 GAS Tokens. `,
      btnText: `Buy ${CHAIN_INFO[currentChainId].gasTokenName}!`,
      img: GASToken,
      btnLink: CHAIN_INFO[currentChainId].buyAddress,
    },
    {
      title: 'Non-Fungible Patrons',
      text: `Become a Non-Fungible Patron! 
      Mint a Common, Rare or Legendary NFP
      and enjoy exclusive Patron perks! No Service Fees,
      USDC Dividends, & More!`,
      btnText: 'Mint NFPs!',
      img: NFPToken,
      btnLink: '/#/nfp',
    },
  ]);

  return (
    <>
      <BannerSection />

      <div className="flex-row d-flex">
        <div className="flex-column">
          <div className="flex-row d-flex justify-content-center">
            <h5 className="title-3">
              Welcome! You Are Currently Viewing{' '}
              <h1 className="title-2">{CHAIN_INFO[currentChainId].name}</h1>
            </h5>

            <button className="button1">
              <span className="title-4">
                Buy {CHAIN_INFO[currentChainId].gasTokenName}
              </span>
            </button>

            <button className="button1">
              <span className="title-5">
                Chart {CHAIN_INFO[currentChainId].gasTokenName}
              </span>
            </button>
            <button className="button1">
              <span className="title-4">
                Stake {CHAIN_INFO[currentChainId].gasTokenName}
              </span>
            </button>

            <button className="button1">
              <span className="title-5">
                Stats for {CHAIN_INFO[currentChainId].gasTokenName}
              </span>
            </button>
            <button className="button1">
              <span className="title-4">
                Mint {CHAIN_INFO[currentChainId].name} Patrons
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={`collapse ${UIOpen ? 'show' : ''}`}>
        <div className="d-flex flex-row">
          <div className="flex-column">
            <div className="flex-row d-flex flex-wrap">
              <div className="col-lg-4">
                <h3 className="title-3">
                  <span>
                    <img src={GASToken} />
                    GAS Tokens
                  </span>
                </h3>
                <div className="flex-row d-flex justify-content-center">
                  <div className="flex-column d-flex patron-block">
                    <div className="flex-row d-flex">
                      <div className="flex-column text">
                        <div className="flex-row d-flex ">
                          <div className="flex-column">
                            <h4>
                              <div className="r title-2">
                                what is gas token?
                              </div>
                            </h4>
                            <p>
                              The GAS Token is a Dividend Paying Token that
                              grants Static Rewards in the Native Gas per
                              Blockchain.
                            </p>
                          </div>
                          <img src={gas} />
                        </div>
                        <div className="flex-row d-flex ">
                          <img src={holder} />
                          <div className="flex-column">
                            <h4>
                              <div className="l title-3">
                                passively earn native ether
                              </div>
                            </h4>
                            <p>
                              8% Reward in native gas per blockchain! As long as
                              you hold GAS tokens you will start to earn native
                              blockchain gas (BNB, MATIC, ETH, etc)!
                            </p>
                          </div>
                        </div>
                        <div className="flex-row d-flex ">
                          <div className="flex-column">
                            <h4>
                              <div className="r title-2">fund development</div>
                            </h4>
                            <p>
                              every transation helps fund underlying liquidities
                              between GAS tokens and network bridge liquidities.
                            </p>
                            <a href="https://gasstationcrypto.gitbook.io/the-crypto-gas-station/information/ecosystem/products/our-tokens/tokenomics">
                              Learn More!
                            </a>
                          </div>
                          <img src={dev} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <h3 className="title-2">
                  <span>
                    <img src={NFPToken} />
                    Patrons
                  </span>
                </h3>

                <div className="flex-row d-flex justify-content-center">
                  <div className="flex-column d-flex patron-block">
                    <div className="flex-row d-flex">
                      <div className="flex-column text">
                        <div className="flex-row d-flex ">
                          <img src={legendaryArray[legendary]} />
                          <div className="flex-column">
                            <h4>
                              <div className="l title-3">what are patrons?</div>
                            </h4>
                            <p>
                              Patrons are unique one-of-a-kind hand drawn &
                              script generated NFTs that will help fund the
                              protocol liquidities.
                            </p>
                          </div>
                        </div>
                        <div className="flex-row d-flex ">
                          <div className="flex-column">
                            <h4>
                              <div className="r title-2">Earn Rewards</div>
                            </h4>
                            <p>
                              Rare & Legendary Patrons have unique rewards to
                              their owners.
                            </p>
                          </div>
                          <img src={rareArray[rare]} />
                        </div>
                        <div className="flex-row d-flex ">
                          <img src="/images/nfps.gif" />
                          <div className="flex-column">
                            <h4>
                              <div className="l title-3">what are patrons?</div>
                            </h4>
                            <p>
                              Supply is Extremely limited. Filler TextFiller
                              TextFiller TextFiller TextFiller TextFiller
                              TextFiller TextFiller TextFiller Text
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <h3 className="title-3">
                  <span>
                    <img src={Gauge} />
                    Fuel Tanks
                  </span>
                </h3>

                <div className="flex-row d-flex justify-content-center">
                  <div className="flex-column d-flex patron-block">
                    <div className="flex-row d-flex">
                      <div className="flex-column text">
                        <div className="flex-row d-flex ">
                          <img src={pump} className="noborder-img" />
                          <div className="flex-column">
                            <h4>
                              <div className="l title-3">Fuel Up!</div>
                            </h4>
                            <p>
                              Head on over to the rewards hub where you will
                              find fuel tanks (staking pools) to stake your
                              assets and fuel your tank.
                            </p>
                          </div>
                        </div>
                        <div className="flex-row d-flex ">
                          <div className="flex-column">
                            <h4>
                              <div className="r title-2">
                                Safe, Secure, Simple.
                              </div>
                            </h4>
                            <p>
                              Filler TextFiller TextFiller TextFiller TextFiller
                              TextFiller TextFiller TextFiller TextFiller Text
                            </p>
                          </div>
                          <img src={fuel4} className="noborder-img" />
                        </div>
                        <div className="flex-row d-flex ">
                          <img src={fuel5} className="noborder-img" />
                          <div className="flex-column">
                            <h4>
                              <div className="l title-3">
                                More of what you love
                              </div>
                            </h4>
                            <p>
                              Filler TextFiller TextFiller TextFiller TextFiller
                              TextFiller TextFiller TextFiller TextFiller Text
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-center flex-wrap">
        <div className="flex-column">
          <h6 className="title-2">Our Partners</h6>
          <div className="flex-row flex-wrap d-flex card-list-row">
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
          </div>
        </div>
        <div className="flex-column">
          <h6 className="title-2">Built With</h6>
          <div className="flex-row flex-wrap d-flex card-list-row">
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
            <img src="https://via.placeholder.com/50x50" />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="flex-row flex-wrap d-flex justify-content-center">
            <p className="title-2">Copyright 2022</p>
            <p className="title-3">
              The Gas Station: #1 Ether Dividend Rewards Protocol
            </p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center flex-wrap card-list2 clickable">
          <img src={NFPToken} onClick={toggleUI} />
          <h6>Toggle UI</h6>
        </div>
      </div>
    </>
  );
};

export default HomePage;
