import { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import ReactLoading from 'react-loading';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
type modalOpen = {
  isBridgeTxOpen: boolean;
  setIsOpen: any;
  closeBridgeTx: any;
};

export const BridgeTransactionModal = ({
  isBridgeTxOpen,
  setIsOpen,
  closeBridgeTx,
}: modalOpen) => {
  const [stepOne, showStepOne] = useState(true);
  const [stepTwo, showStepTwo] = useState(false);
  const [stepThree, showStepThree] = useState(false);
  const [stepFour, showStepFour] = useState(false);
  const [stepFive, showStepFive] = useState(false);
  const [showFailedStepOne, setShowFailedStepOne] = useState(true);
  const [showFailedStepTwo, setShowFailedStepTwo] = useState(false);
  const [showFailedStepThree, setShowFailedStepThree] = useState(false);
  const [showFailedStepFour, setShowFailedStepFour] = useState(false);

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
              <div className="confirmationBlock">
                <div className="state">Steps: X / 4</div>
                {showFailedStepOne ? (
                  <>
                    <div className="state">
                      <VscError
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: 'auto',
                          color: 'red',
                        }}
                      />
                      <h3 className="error">There was an error!</h3>
                    </div>
                    <div className="flex-column">
                      <p>
                        Error Text Goes Right In Here and Looks Like We can fit
                        a shit load of this error text in here fam.Error Text
                        Goes Right In Here and Looks Like We can fit a shit load
                        of this error text in here fam.Error Text Goes Right In
                        Here and Looks Like We can fit a shit load of this error
                        text in here fam.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="state">
                    {stepTwo ? (
                      <div className="enabled">
                        <BsFillPatchCheckFill
                          className="text-green"
                          style={{
                            width: '40px',
                            height: '40px',
                            margin: 'auto',
                          }}
                        />
                        <h3 className="complete">Confirmed</h3>
                      </div>
                    ) : (
                      <div className="enabled">
                        {' '}
                        <ReactLoading />{' '}
                        <h3 className={stepOne ? 'active' : 'inactive'}>
                          Awaiting Confirmation
                        </h3>
                      </div>
                    )}
                  </div>
                )}
                {showFailedStepTwo ? (
                  <div className="state">
                    <div className={showFailedStepOne ? 'disabled' : 'error'}>
                      <VscError
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: 'auto',
                          color: 'red',
                        }}
                      />
                      <h3 className="error">There was an error!</h3>

                      <div className="flex-column">
                        <p>
                          Error Text Goes Right In Here and Looks Like We can
                          fit a shit load of this error text in here fam.Error
                          Text Goes Right In Here and Looks Like We can fit a
                          shit load of this error text in here fam.Error Text
                          Goes Right In Here and Looks Like We can fit a shit
                          load of this error text in here fam.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="state">
                    {stepThree ? (
                      <div
                        className={showFailedStepOne ? 'disabled' : 'enabled'}
                      >
                        <BsFillPatchCheckFill
                          className="text-green"
                          style={{
                            width: '40px',
                            height: '40px',
                            margin: 'auto',
                          }}
                        />
                        <h3 className="complete">Confirmed</h3>
                      </div>
                    ) : (
                      <div
                        className={showFailedStepOne ? 'disabled' : 'enabled'}
                      >
                        {' '}
                        <ReactLoading />{' '}
                        <h3 className={stepTwo ? 'active' : 'inactive'}>
                          Awaiting Confirmation
                        </h3>
                      </div>
                    )}
                  </div>
                )}
                {showFailedStepThree ? (
                  <div className="state">
                    <div className={showFailedStepTwo ? 'disabled' : 'error'}>
                      <VscError
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: 'auto',
                          color: 'red',
                        }}
                      />
                      <h3 className="error">There was an error!</h3>

                      <div className="flex-column">
                        <p>
                          Error Text Goes Right In Here and Looks Like We can
                          fit a shit load of this error text in here fam.Error
                          Text Goes Right In Here and Looks Like We can fit a
                          shit load of this error text in here fam.Error Text
                          Goes Right In Here and Looks Like We can fit a shit
                          load of this error text in here fam.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="state">
                    {stepFour ? (
                      <div
                        className={
                          { showFailedStepTwo, showFailedStepOne }
                            ? 'disabled'
                            : 'enabled'
                        }
                      >
                        <BsFillPatchCheckFill
                          className="text-green"
                          style={{
                            width: '40px',
                            height: '40px',
                            margin: 'auto',
                          }}
                        />
                        <h3 className="complete">Confirmed</h3>
                      </div>
                    ) : (
                      <div
                        className={showFailedStepTwo ? 'disabled' : 'enabled'}
                      >
                        {' '}
                        <ReactLoading />{' '}
                        <h3 className={stepThree ? 'active' : 'inactive'}>
                          Awaiting Confirmation
                        </h3>
                      </div>
                    )}
                  </div>
                )}
                {showFailedStepFour ? (
                  <div className="state">
                    <div className={showFailedStepThree ? 'disabled' : 'error'}>
                      <VscError
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: 'auto',
                          color: 'red',
                        }}
                      />
                      <h3 className="error">There was an error!</h3>

                      <div className="flex-column">
                        <p>
                          Error Text Goes Right In Here and Looks Like We can
                          fit a shit load of this error text in here fam.Error
                          Text Goes Right In Here and Looks Like We can fit a
                          shit load of this error text in here fam.Error Text
                          Goes Right In Here and Looks Like We can fit a shit
                          load of this error text in here fam.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="state">
                    {stepFive ? (
                      <div
                        className={
                          {
                            showFailedStepThree,
                            showFailedStepTwo,
                            showFailedStepOne,
                          }
                            ? 'disabled'
                            : 'enabled'
                        }
                      >
                        <BsFillPatchCheckFill
                          className="text-green"
                          style={{
                            width: '40px',
                            height: '40px',
                            margin: 'auto',
                          }}
                        />
                        <h3 className="complete">Confirmed</h3>
                      </div>
                    ) : (
                      <div
                        className={showFailedStepThree ? 'disabled' : 'enabled'}
                      >
                        {' '}
                        <ReactLoading />{' '}
                        <h3 className={stepFour ? 'active' : 'inactive'}>
                          Awaiting Confirmation
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default BridgeTransactionModal;
