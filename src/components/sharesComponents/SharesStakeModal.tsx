import { MDBModal } from 'mdb-react-ui-kit';
import { FaRegWindowClose } from 'react-icons/fa';
type modalOpen = {
  showStakeModal: any;
  closeStakeModal: any;
};
export const SharesStakeModal = ({
  showStakeModal,
  closeStakeModal,
}: modalOpen) => {
  return (
    <MDBModal
      show={showStakeModal}
      className="BridgeTx-modal"
      setShow={showStakeModal}
    >
      <div className="stakeModal">
        <div className="sharesCard">
          <div className="title">
            <div className="stake">Stake asstname</div>
            <div className="earn">
              <div className="clickable" onClick={closeStakeModal}>
                <FaRegWindowClose style={{ width: '40px', height: '40px' }} />
              </div>
            </div>
          </div>
          <div className="body">
            <div className="flex-row d-flex align-items-center">
              <img src="https://via.placeholder.com/150x150" />
              <h4 className="text-pink">Asset Name</h4>
              <div className="content1">
                <span>Balance</span>
                <p>$$$</p>
              </div>
            </div>
            <div className="content1">
              <span>AMOUNT TO STAKE</span>
              <input className="input" type="text" />
              <div className="range">
                <input type="range" className="form-range" id="customRange1" />
              </div>
              <div className="flex-row d-flex">
                <button className="button2">25%</button>
                <button className="button2">50%</button>
                <button className="button2">75%</button>
                <button className="button2">100%</button>
              </div>
            </div>
          </div>
          <button>Stake</button>
        </div>
      </div>
    </MDBModal>
  );
};
export default SharesStakeModal;
