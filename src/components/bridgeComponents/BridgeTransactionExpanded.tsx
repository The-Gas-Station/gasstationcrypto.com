// import { HiOutlineBadgeCheck } from 'react-icons/hi';
import {
  // BsPatchExclamation,
  BsBoxArrowInRight,
  BsBoxArrowRight,
  BsBoxArrowUpRight,
} from 'react-icons/bs';

export const BridgeTransactionExpanded = () => {
  return (
    <div className="body">
      <div className="innerbody">
        <div className="item">
          <p>
            <BsBoxArrowInRight
              className="text-green"
              style={{ width: '24px', height: '24px', margin: '3px' }}
            />{' '}
            From
          </p>
          <div className="details">
            <span>
              <img src="https://via.placeholder.com/20x20" />
              BSC
            </span>
            <span>/</span>
            <span>
              <img src="https://via.placeholder.com/20x20" />
              USDC
            </span>
          </div>
        </div>
        <div className="vert-break" />
        <div className="item">
          <p>
            <BsBoxArrowRight
              className="text-green"
              style={{ width: '24px', height: '24px', margin: '3px' }}
            />{' '}
            To
          </p>
          <div className="details">
            <span>
              <img src="https://via.placeholder.com/20x20" />
              Polygon
            </span>
            <span>/</span>
            <span>
              <img src="https://via.placeholder.com/20x20" />
              USDC
            </span>
          </div>
        </div>
      </div>
      <div className="outerbody">
        <div className="item">
          <span>Amount [USDC]</span>
          <p>82.45</p>
        </div>

        <div className="item">
          <span>
            Status{' '}
            {/*this needs to be a hook with transaction success*/
            /* {showSuccess ? (
              <HiOutlineBadgeCheck className="text-green" />
            ) : (
              <BsPatchExclamation />
            )} */}
          </span>
          <p>4/4 Complete</p>
        </div>
        <div className="item">
          <a href="https://www.google.com">
            <p>
              See Block Info <BsBoxArrowUpRight className="text-green" />
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BridgeTransactionExpanded;
