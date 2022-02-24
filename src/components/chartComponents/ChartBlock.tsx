import { useState } from 'react';
import NoHistory from './NoHistory';
import History from './History';
import { ChartChoice } from '../chartComponents/ChartChoice';

export const ChartBlock = () => {
  const [showHistory, setShowHistory] = useState(true);
  const [showNoHistory] = useState(false);

  const getInitialState = () => {
    const value = ChartChoice.bscGAS;
    return value;
  };
  const [value, setValue] = useState(getInitialState);
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="flex-column">
        <div className="darkrow1">
          <p>Select An Asset:</p>
          <select value={value} onChange={handleChange}>
            <option value={ChartChoice.bscGAS}>bscGAS</option>
            <option value={ChartChoice.polyGAS}>polyGAS</option>
            <option value={ChartChoice.ftmGAS}>ftmGAS</option>
            <option value={ChartChoice.avaxGAS}>avaxGAS</option>
            <option value={ChartChoice.movrGAS}>movrGAS</option>
            <option value={ChartChoice.croGAS}>croGAS</option>
          </select>
          <div className="form-check wallet">
            <input
              className="form-check-input"
              type="radio"
              name="History"
              id="History1"
              value="option1"
              onClick={() => setShowHistory(true)}
            />
            <label className="form-check-label text-light" htmlFor="History1">
              Show Trading History
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="History"
                id="History2"
                value="option2"
                onClick={() => setShowHistory(false)}
                checked
              />
              <label className="form-check-label text-light" htmlFor="History2">
                Hide Trading History
              </label>
            </div>
          </div>
        </div>

        <div className="chartcard">
          {showNoHistory ? <NoHistory chartChoice={value} /> : null}

          {showHistory ? <History chartChoice={value} /> : null}
        </div>
      </div>
    </>
  );
};
export default ChartBlock;
