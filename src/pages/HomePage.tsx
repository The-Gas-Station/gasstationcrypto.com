import React, { useState, useEffect } from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardTitle,
  MDBBtn,
  MDBCardText,
  MDBCardLink,
  MDBRipple,
  MDBCardImage,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem
} from 'mdb-react-ui-kit';

import cardImg from '../assets/doller.png';
import logoImg from '../assets/queen.png';
import FuelImg from '../assets/fuelcan.svg';
import BannerImg from '../assets/img-01.png';
import Avax from '../assets/avax.png';
import Bsc from '../assets/bsc.png';
import Ftm from '../assets/ftm.png';
import Poly from '../assets/poly.png';
import Usdc from '../assets/usdc.png';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings1 = {
  dots: false,
  arrows: true,
  cssEase: "ease-out",
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const BannerSection = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  let isMobile: boolean = (width <= 768);
  return (
    <>
      <div className={`banner-section`}>
        <div className="col-lg-6">
          <div className="banner-text">
            <h5 className="text-white">
              We're building the multi-chain crypto bridge so you can swap
              between major crypto networks.
            </h5>
            <p className="text-green">
              <strong>Invest in the project today.</strong>
            </p>
            <p>Earn up to 500% APR in our reward hub.</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`banner-img ${isMobile ? '' : 'd-none'}`}>
            <img src={BannerImg} alt="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

const BidgeSection = (props: any) => {
  const { bridgeProps } = props;
  const { title, text, launchDate, btnText, img } = bridgeProps;
  // console.log(bridgeProps, 'bidgePreop');

  return (
    <MDBCard className="flex-fill card-list">
      <MDBRipple rippleTag="div" className="circle-img">
        <div className="circle-img-bg">
          <MDBCardImage src={img} fluid alt="" />
        </div>
      </MDBRipple>
      <MDBCardBody>
        {/* {bridgeProps.title} */}
        <MDBCardTitle className="card-list-title text-center">
          {title}
        </MDBCardTitle>
        <MDBCardText>{text}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
        {launchDate && (
          <MDBCardLink className="text-white">{launchDate}</MDBCardLink>
        )}
        {btnText && <MDBBtn className="btn-block">{btnText}</MDBBtn>}
      </MDBCardFooter>
    </MDBCard>
  );
};

const AllNetworkList = (props: any) => {
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
              <MDBCarouselItem className='active'>
                {tvl && (
                  <p className="card-text">
                    <small>TVL</small>
                    {tvl}
                  </p>
                )}

                {launchDate && <p className="card-text"><span className="comming-soon">Comming Soon</span></p>}

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
                {launchDate && <span className="comming-soon">Comming Soon</span>}
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
                {launchDate && <span className="comming-soon">Comming Soon</span>}
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

export const HomePage = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  let isMobile: boolean = (width < 768);

  const [sectionList] = useState([
    {
      title: 'USDC Bridge',
      text: `Gas Station allows you to swap USDC
      between major crypto networks instantly,
      easily and with the lowest fees. We also
      provide a faucet, so you're never without
      Gas fees ever again.`,
      launchDate: `Launching December 2021`,
      img: cardImg,
    },
    {
      title: 'GAS Tokens',
      text: `Each network has a total supply of 100b
      Gas Tokens. Tokens are available now! Buy
      tokens today to receive discounts on Gas
      fees while investing in our project early-
      stage for maximum rewards.`,
      btnText: `Buy GAS on ApeSwap`,
      img: FuelImg,
    },
    {
      title: 'Non-Fungible Patrons',
      text: `Become a Non-Fungible Patron today by
      buying a Common, Rare or Legendary NET
      and enjoy exclusive Patron perks – free
      transactions and transaction fees, to name
      a few.`,
      btnText: 'Snag a Gas Station NFT',
      img: logoImg,
    },
  ]);
  const [networkList] = useState([
    {
      icon: Bsc,
      title: 'bscGAS',
      tvl: '$50,000',
      liquidity: '100,000,000',
    },
    {
      icon: Poly,
      title: 'polyGAS',
      tvl: '$50,000',
      liquidity: '100,000,000',
    },
    {
      icon: Ftm,
      title: 'ftmGAS',
      tvl: '$50,000',
      liquidity: '100,000,000',
    },
    {
      icon: Avax,
      title: 'avaxGAS',
      launchDate: '31 OCt 2021',
    },
    {
      icon: Usdc,
      title: 'usdcGAS',
      tvl: '$50,000',
      liquidity: '100,000,000',
    },
  ]);
  return (
    <>
      <BannerSection />
      <div className="services-block">
        <div className="row gx-xxl-5">
          {sectionList.map((list, i) => {
            return (
              <div className="col-md-6 col-xl-4">
                <div key={i} className="flex-fill services-item">
                  <BidgeSection bridgeProps={list} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="value-block">
        <div className="mt-4 row">
          <div className="col-xl-9">
            <div className="total-locked-value">
              <div className="total-locked-title">
                <h3>Total value Locked</h3>
                <h5>All Networks</h5>
              </div>
              <div className="amount-details">
                <div className="amount-tvl">
                  <small>TVL</small>
                  <p>$11,234,567</p>
                </div>
                <div className="amount-market-cap">
                  <small>USD MARKET CAP</small>
                  <p>$2,467,899</p>
                </div>
              </div>
              <div className="all-network-list">
                {isMobile ?
                  <div className="value-slider">
                    <Slider {...settings1}>
                      {networkList.map((list, i) => {
                        return <AllNetworkList key={i} items={list} />;
                      })}
                    </Slider>
                  </div>
                  :
                  networkList.map((list, i) => {
                    return <AllNetworkList key={i} items={list} />;
                  })}
              </div>
            </div>
          </div>
          <div className="col-xl-3 ">
            <div className="upcoming-events flex-fill">
              <h5 className="upcoming-title mb-3">Upcoming events</h5>
              <ul className="list-group w-100">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">
                      Non Fungible Patrons: Rare Mint 2/5
                    </div>
                    <small>10 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">polyGAS Tax Reduces -1%</div>
                    <small>3 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">bscGAS Tax Reduces -1%</div>
                    <small>3 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">ftmGAS Liquidity Mining Event</div>
                    <small>12 September - 10 November 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">
                      Non Fungible Partons: Rare Mint 1/5
                    </div>
                    <small>3 September 2021</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
