import { ethers } from 'ethers';

export const PERCISION = 30;
export const BUFFER = ethers.BigNumber.from(10).pow(PERCISION);

export default BUFFER;
