import { useState } from 'react';
export const ApplyAsProject = () => {
  const [inputAudit, setShowAudit] = useState(false);
  const [mintedTokens, setMintedTokens] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);
  const [showReddit, setShowReddit] = useState(false);

  return (
    <form>
      <div className="flex-row d-flex justify-content-center">
        <div className="col-lg-8">
          <div className="tx-card">
            <div className="head">
              <h4 className="title-2">Apply As A Project!</h4>
            </div>
            <div className="body">
              <h3 className="title-3">Preliminary Details</h3>
              <div className="flex-row d-flex flex-wrap align-items-center justify-content-center">
                <div className="innerbody">
                  <h6 className="title-6">Project Name</h6>
                  <input type="text" className="form-control1" />
                </div>
                <div className="innerbody">
                  <h6 className="title-7">Project Website</h6>
                  <input type="text" className="form-control1" />
                </div>
              </div>
              <div className="flex-row d-flex flex-wrap align-items-center justify-content-center">
                <div className="innerbody">
                  <h6 className="title-7">Contact Name</h6>
                  <input type="text" className="form-control1" />
                </div>
                <div className="innerbody">
                  <h6 className="title-6">Contact Email</h6>
                  <input type="text" className="form-control1" />
                </div>
              </div>
              <h3 className="title-2">Token Details</h3>
              <div className="flex-row d-flex flex-wrap justify-content-center align-items-center">
                <div className="innerbody">
                  <h6 className="title-6">Token Ticker</h6>
                  <input type="text" className="form-control1" />
                </div>
                <div className="innerbody">
                  <h6 className="title-7">Total Supply</h6>
                  <input type="text" className="form-control1" />
                </div>
              </div>
              <div className="flex-row d-flex flex-wrap justify-content-center align-items-center dropdown">
                <select className="item-3">
                  <option value="">Select Token Contract Type</option>
                  <option value="">
                    Standard ERC-20 (NO TAX/BURN/MINT Functions)
                  </option>
                  <option value="">
                    Reflect ERC-20 (REFLECTS THE SAME TOKEN)
                  </option>
                  <option value="">
                    Dividend Reward ERC-20 (REWARDS ANOTHER TOKEN)
                  </option>
                  <option value="">
                    DeFi v1.0 ERC-20 (STANDARD MASTERCHEF FARM TOKEN)
                  </option>
                  <option value="">
                    DeFi v2.0 ERC-20 (DAO STYLE FARM TOKEN)
                  </option>
                  <option value="">
                    GameFi ERC-20 (GAME REWARD / PURCHASE TOKEN)
                  </option>
                </select>
              </div>

              <div className="flex-row d-flex flex-wrap align-items-center justify-content-center">
                <div className="innerbody-col align-items-center">
                  <h6 className="title-5">Are Tokens Minted?</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Minted"
                      id="Minted1"
                      value="option1"
                      onClick={() => setMintedTokens(true)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Minted1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Minted"
                      id="Minted2"
                      value="option2"
                      onClick={() => setMintedTokens(false)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Minted2"
                    >
                      No
                    </label>
                  </div>
                  {mintedTokens ? (
                    <div className="flex-column d-flex justify-content-center">
                      <h6 className="title-7">deployer wallet address</h6>
                      <input type="text" className="form-control1" />
                      <h6 className="title-6">token contract address</h6>
                      <input type="text" className="form-control1" />
                    </div>
                  ) : null}
                </div>
                <div className="innerbody-col align-items-center">
                  <h6 className="title-4">
                    Do You Have (or plan on) Contract Audits?
                  </h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits1"
                      value="option1"
                      onClick={() => setShowAudit(true)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits2"
                      value="Audits2"
                      onClick={() => setShowAudit(false)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits2"
                    >
                      No
                    </label>
                  </div>
                  {inputAudit ? (
                    <div className="flex-column d-flex justify-content-center">
                      <h6 className="title-6">link to audit / auditor name</h6>
                      <input type="text" className="form-control1" />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex-row d-flex flex-wrap align-items-center justify-content-center">
                <div className="innerbody-col align-items-center">
                  <h6 className="title-4">Discord Server?</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits1"
                      value="option1"
                      onClick={() => setShowDiscord(true)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits2"
                      value="Audits2"
                      onClick={() => setShowDiscord(false)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits2"
                    >
                      No
                    </label>
                  </div>
                  {showDiscord ? (
                    <div className="flex-column d-flex justify-content-center">
                      <h6 className="title-9">link to server</h6>
                      <input type="text" className="form-control1" />
                    </div>
                  ) : null}
                </div>
                <div className="innerbody-col align-items-center">
                  <h6 className="title-4">Telegram Channel?</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits1"
                      value="option1"
                      onClick={() => setShowTelegram(true)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits2"
                      value="Audits2"
                      onClick={() => setShowTelegram(false)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits2"
                    >
                      No
                    </label>
                  </div>
                  {showTelegram ? (
                    <div className="flex-column d-flex justify-content-center">
                      <h6 className="title-9">link to channel</h6>
                      <input type="text" className="form-control1" />
                    </div>
                  ) : null}
                </div>
                <div className="innerbody-col align-items-center">
                  <h6 className="title-4">Reddit?</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits1"
                      value="option1"
                      onClick={() => setShowReddit(true)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Audits"
                      id="Audits2"
                      value="Audits2"
                      onClick={() => setShowReddit(false)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="Audits2"
                    >
                      No
                    </label>
                  </div>
                  {showReddit ? (
                    <div className="flex-column d-flex justify-content-center">
                      <h6 className="title-9">link to subreddit</h6>
                      <input type="text" className="form-control1" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ApplyAsProject;
