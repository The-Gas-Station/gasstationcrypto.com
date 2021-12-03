import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';
import UsdcIcon from '../assets/usdc-rewards.svg';
import DoubleArrow from '../assets/double-arrow.svg';
import { type } from 'os';
import { Range, getTrackBackground } from 'react-range';

type modalOpen = {
    isStakeModalOpen: boolean,
    toggleStakeModal: any
}

export const StackModal = ({ isStakeModalOpen, toggleStakeModal }: modalOpen) => {
    try {
        const [values, setValue] = useState([50])

        console.log('range-values', values)
        return (
            <>
                <MDBModal show={isStakeModalOpen} className="stack-modal" setShow={toggleStakeModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Stake</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleStakeModal}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div className="title">
                                    <h5><img src={UsdcIcon} alt="" />APE-LP</h5>
                                    <p>Balance <br /><span>2465.2848</span></p>
                                </div>
                                <div className="input-form-control">
                                    <label>AMOUNT TO STAKE</label>
                                    <input type="text" className="form-control" placeholder="0.0" />
                                    <span>~ 0.0 USD +55%</span>
                                </div>
                                <div className="stake-progress-block">
                                    <div className="stake-progress">
                                        <Range
                                            step={1}
                                            min={0}
                                            max={100}
                                            values={values}
                                            onChange={(value) => setValue(value)}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    onMouseDown={props.onMouseDown}
                                                    onTouchStart={props.onTouchStart}
                                                    style={{
                                                        ...props.style,
                                                        height: "36px",
                                                        display: "flex",
                                                        width: "100%"
                                                    }}
                                                >
                                                    <div
                                                        ref={props.ref}
                                                        style={{
                                                            height: "4px",
                                                            width: "100%",
                                                            borderRadius: "4px",
                                                            background: getTrackBackground({
                                                                values: values,
                                                                colors: ["#28CCAB", "#32334A"],
                                                                min: 0,
                                                                max: 100
                                                            }),
                                                            alignSelf: "center"
                                                        }}
                                                    >
                                                        {children}
                                                    </div>
                                                </div>
                                            )}
                                            renderThumb={({ props, isDragged }) => (
                                                <>
                                                    <div className="range-thumb"
                                                        {...props}
                                                    >
                                                        <div className="range-thumb-icon">
                                                            <img src={DoubleArrow} alt="" />
                                                        </div>
                                                        <output className="price-count" id="output">
                                                            {values[0]}%
                                                        </output>
                                                    </div>

                                                </>
                                            )}
                                        />

                                    </div>
                                    <div className="stake-prices">
                                        <span onClick={() => setValue([25])}>25%</span>
                                        <span onClick={() => setValue([50])}>50%</span>
                                        <span onClick={() => setValue([75])}>75%</span>
                                        <span onClick={() => setValue([100])}>MAX</span>
                                    </div>
                                </div>
                                <button className="join-btn" onClick={toggleStakeModal}>Confirm</button>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>
        );
    } catch (e) { }

    return <></>;
};

export default StackModal;