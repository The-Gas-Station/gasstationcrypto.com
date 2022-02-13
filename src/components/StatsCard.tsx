import React from 'react';
import { CHAIN_INFO } from '../configs';
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

export const StatsCard = ({ chainId }: { chainId: number }) => {
  const chainData = CHAIN_INFO[chainId];
  return (
    <div className="col-3 box1">
      <div className="header">
        <div className={`avatar avatar-${chainId}`}>
          <img src={chainData.tokenImage.replace('/public/', '/')} alt="icon" />
        </div>
        <span>{chainData.gasTokenName}</span>
      </div>
      <div className="body">
        <div className="d-flex flex-row">
          <div className="stat-box">
            <p>Market Capital</p>
            <span>$100,000</span>
          </div>
          <div className="stat-box">
            <p>Total Value Locked</p>
            <span>$100,000</span>
          </div>
        </div>
        <br className="white-space" />
        <div className="flex justify-content-center">
          <MDBTable hover small>
            <MDBTableBody>
              <tr>
                <th scope="row">Total Supply</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">Circulating Supply</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">Burned Supply</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">% Burned Supply</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">% Held In Wallets</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">% Held In Contracts</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">Largest Holder</th>
                <td>100,000,000,000 GAS</td>
              </tr>
              <tr>
                <th scope="row">Dividend Rate</th>
                <td>100,000,000,000 GAS</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
