import { Interface } from '@ethersproject/abi';
import GASToken from './abi/GASToken.json';

const GASTokenInterface = new Interface(GASToken);

export { GASToken, GASTokenInterface };
