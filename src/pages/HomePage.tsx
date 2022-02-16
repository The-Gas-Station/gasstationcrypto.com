import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import BannerSection from './home/BannerSection';

import Gauge from '../assets/Gauge.svg';
import NFPToken from '../assets/NFPcolor.svg';
import GASToken from '../assets/GASToken.svg';
import holder from '../assets/tokenholder.png';
import dev from '../assets/dev.png';
import gas from '../assets/gas.svg';
import fuel4 from '../assets/shield.svg';
import fuel5 from '../assets/wlt.svg';
import bsicon from '../assets/bootstrap.svg';
import reacticon from '../assets/react.svg';
import nodeicon from '../assets/nodejsicon.svg';
import pssicon from '../assets/pss.svg';
import apelabsicon from '../assets/apelabs.png';
import crystlicon from '../assets/crystl.svg';
import ethersicon from '../assets/ethers.svg';
import pump from '../assets/Pump.svg';

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
export const HomePage = () => {
  const { currentChainId } = useWeb3ConnectionsContext();
  return (
    <>
      <BannerSection />
      <div className="flex-row d-flex">
        <div className="flex-column">
          <div className="flex-row d-flex justify-content-center flex-wrap">
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
                            <div className="r title-2">what is gas token?</div>
                          </h4>
                          <p>
                            The GAS Token is a Dividend Paying Token that grants
                            Static Rewards in the Native Gas per Blockchain.
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
                            Patrons are unique one-of-a-kind hand drawn & script
                            generated NFTs that will help fund the protocol
                            liquidities.
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
                            <div className="l title-3">
                              As Rare as they come
                            </div>
                          </h4>
                          <p>
                            Supply is Extremely limited. Only 550 patrons per
                            blockchain! get them while they last!
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
                            Head on over to the rewards hub where you will find
                            fuel tanks to stake your assets and fuel your tank.
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
                            Fuel Tank Smart Contracts are verified and tested
                            for safety & security. 100% of funds in fuel tanks
                            are only accessible by the owner of the stake. No
                            Hidden Fees, No Strings Attached, No BS.
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
                            Stake To Earn GAS, HODL GAS to earn more native
                            ether. You can earn GAS Tokens without ever buying
                            them! Amazing!
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
      <div className="d-flex flex-row justify-content-center flex-wrap">
        <div className="col-12 col-lg-3">
          <h6 className="title-2">Our Partners</h6>
          <div className="flex-row flex-wrap d-flex img-row">
            <img src={pssicon} />
            <img src={crystlicon} />
            <img src={apelabsicon} />
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <h6 className="title-2">Built With</h6>
          <div className="flex-row flex-wrap d-flex img-row">
            <img src={nodeicon} />
            <img src={reacticon} />
            <img src={ethersicon} />
            <img src={bsicon} />
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
      </div>
    </>
  );
};

export default HomePage;
