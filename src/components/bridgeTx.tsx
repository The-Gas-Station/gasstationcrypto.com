import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

type modalOpen = {
  isBridgeTxOpen: boolean;
  setIsOpen: any;
  closeBridgeTx: any;
};

export const BridgeTxModal = ({
  isBridgeTxOpen,
  setIsOpen,
  closeBridgeTx,
}: modalOpen) => {
  return (
    <>
      <MDBModal
        show={isBridgeTxOpen}
        className="BridgeTx-modal"
        setShow={setIsOpen}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Transaction is processing...</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeBridgeTx}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalFooter>
              <div className="wallet-item-block">
                <span className="title">
                  Your Transaction Has Been Recorded. Please Allow $TIME To Pass
                </span>
                <div className="wallet-items"></div>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default BridgeTxModal;
