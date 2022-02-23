import React from 'react';
import { CHAIN_INFO } from '../configs';

export const ImageRow = ({ chainId }: { chainId: number }) => {
  const chainData = CHAIN_INFO[chainId];
  return <img src={chainData.tokenImage.replace('/public/', '/')} alt="icon" />;
};

export default ImageRow;
