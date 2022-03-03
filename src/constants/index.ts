import { Interface } from '@ethersproject/abi';
import GASToken from './abi/GASToken.json';
import PoolDualV1 from './abi/PoolDualV1.json';
import PoolDualV2 from './abi/PoolDualV2.json';
import PoolSingleV1 from './abi/PoolSingleV1.json';
import PoolSingleV2 from './abi/PoolSingleV2.json';
import PoolSingleV3 from './abi/PoolSingleV3.json';
import NFP from './abi/NFP.json';
import Bridge from './abi/Bridge.json';

const GASTokenInterface = new Interface(GASToken);

export { GASToken, GASTokenInterface };

const PoolDualV1Interface = new Interface(PoolDualV1);

export { PoolDualV1, PoolDualV1Interface };

const PoolDualV2Interface = new Interface(PoolDualV2);

export { PoolDualV2, PoolDualV2Interface };

const PoolSingleV1Interface = new Interface(PoolSingleV1);

export { PoolSingleV1, PoolSingleV1Interface };

const PoolSingleV2Interface = new Interface(PoolSingleV2);

export { PoolSingleV2, PoolSingleV2Interface };

const PoolSingleV3Interface = new Interface(PoolSingleV3);

export { PoolSingleV3, PoolSingleV3Interface };

const NFPInterface = new Interface(NFP);

export { NFP, NFPInterface };

const BridgeInterface = new Interface(Bridge);

export { Bridge, BridgeInterface };
