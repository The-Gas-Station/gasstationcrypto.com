import { Contracts } from './components/Contracts';
import Avax from '../../configs/avax.json';
import Bsc from '../../configs/bsc.json';
import Poly from '../../configs/polygon.json';
import Ftm from '../../configs/fantom.json';
import Cro from '../../configs/cronos.json';
import Movr from '../../configs/movr.json';
import FlexRow from '../FlexRow';
type InfoProps = {
  aboutus: any;
  contracts: any;
  tokenomics: any;
  nfp: any;
  fueltanks: any;
  bridge: any;
  locker: any;
  bulksend: any;
  shares: any;
  disclosures: any;
};
export const InformationContent = ({
  aboutus,
  contracts,
  tokenomics,
  nfp,
  fueltanks,
  bridge,
  locker,
  bulksend,
  shares,
  disclosures,
}: InfoProps) => {
  return (
    <>
      <div className="InformationContent">
        {aboutus ? (
          <>
            <div className="InformationTitle">About Us</div>
            <div className="InformationSubtitle"></div>
            <div className="InformationBody">
              <p>
                The Gas Station is aiming to become the leading profit-sharing
                platform amongst all protocols in the Decentralized Finance
                (DeFi) Space.
              </p>
              <p>
                Our hyper-deflationary dividend token(s) reward Ether (gas) to
                our token holders, and allow them to access services such as
                Fueling (Staking) and Bridging (tax-free). Non-Fungible Patrons
                are the collectable assets that help generate a large portion of
                funding into the ecosystem, and allow the collector to earn
                interest on their collectable for years to come.
              </p>
              <p>
                The Gas Station puts 100% of all the development tax back into
                the ecosystem allowing investors to make astonishing returns no
                matter what stage they decide to enter the playing field.
              </p>
            </div>
          </>
        ) : null}
        {disclosures ? (
          <>
            <div className="InformationTitle">Disclosures</div>
            <div className="InformationSubtitle"></div>
            <div className="InformationBody">
              <p>
                Cryptocurrency is a digital representation of value that
                functions as a medium of exchange, a unit of account, or a store
                of value, but it does not have legal tender status.
                Cryptocurrencies are sometimes exchanged for U.S. dollars or
                other currencies around the world, but they are not generally
                backed or supported by any government or central bank. Their
                value is completely derived by market forces of supply and
                demand, and they are more volatile than traditional currencies.
                The value of cryptocurrency may be derived from the continued
                willingness of market participants to exchange fiat currency for
                cryptocurrency, which may result in the potential for permanent
                and total loss of value of a particular cryptocurrency should
                the market for that cryptocurrency disappear. Cryptocurrencies
                are not covered by either FDIC or SIPC insurance.
              </p>
              <p>
                Legislative and regulatory changes or actions at the state,
                federal, or international level may adversely affect the use,
                transfer, exchange, and value of cryptocurrency. Purchasing
                cryptocurrencies comes with a number of risks, including
                volatile market price swings or flash crashes, market
                manipulation, and cybersecurity risks. In addition,
                cryptocurrency markets and exchanges are not regulated with the
                same controls or customer protections available in equity,
                option, futures, or foreign exchange investing. There is no
                assurance that a person who accepts a cryptocurrency as payment
                today will continue to do so in the future. Investors should
                conduct extensive research into the legitimacy of each
                individual cryptocurrency, including its platform, before
                investing. The features, functions, characteristics, operation,
                use and other properties of the specific cryptocurrency may be
                complex, technical, or difficult to understand or evaluate.
              </p>
              <p>
                The cryptocurrency may be vulnerable to attacks on the security,
                integrity or operation, including attacks using computing power
                sufficient to overwhelm the normal operation of the
                cryptocurrency’s blockchain or other underlying technology. Some
                cryptocurrency transactions will be deemed to be made when
                recorded on a public ledger, which is not necessarily the date
                or time that a transaction may have been initiated.
                Cryptocurrency trading requires knowledge of cryptocurrency
                markets. In attempting to profit through cryptocurrency trading
                you must compete with traders worldwide. You should have
                appropriate knowledge and experience before engaging in
                substantial cryptocurrency trading. Any individual
                cryptocurrency may change or otherwise cease to operate as
                expected due to changes made to its underlying technology,
                changes made using its underlying technology, or changes
                resulting from an attack. These changes may include, without
                limitation, a "fork," a "rollback," an "airdrop," or a
                "bootstrap." Such changes may dilute the value of an existing
                cryptocurrency position and/or distribute the value of an
                existing cryptocurrency position to another cryptocurrency.
              </p>
            </div>
          </>
        ) : null}
        {contracts ? (
          <FlexRow>
            <div className="InformationTitle">Contract Addresses</div>
            <div className="InformationSubtitle" />
            <Contracts
              title={Bsc.display}
              img={Bsc.tokenImage.replace('/public/', '')}
              contractAddress={Bsc.gasTokenAddress.replace('evm:', '')}
              lpAddress={Bsc.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Bsc.patronLaunced}
              patronAddress={Bsc.nfpAddress.replace('evm:', '')}
              tokenName={Bsc.gasTokenName}
              tokenHref={Bsc.scanLink}
              patronHref={Bsc.nfpScanLink}
              tokenLock={Bsc.teamLock.replace('evm:', '')}
            />
            <Contracts
              title={Poly.display}
              img={Poly.tokenImage.replace('/public', '')}
              contractAddress={Poly.gasTokenAddress.replace('evm:', '')}
              lpAddress={Poly.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Poly.patronLaunced}
              patronAddress={Poly.nfpAddress.replace('evm:', '')}
              tokenName={Poly.gasTokenName}
              tokenHref={Poly.scanLink}
              patronHref={Poly.nfpScanLink}
              tokenLock={Poly.teamLock.replace('evm:', '')}
            />
            <Contracts
              title={Ftm.display}
              img={Ftm.tokenImage.replace('/public', '')}
              contractAddress={Ftm.gasTokenAddress.replace('evm:', '')}
              lpAddress={Ftm.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Ftm.patronLaunced}
              patronAddress={Ftm.nfpAddress.replace('evm:', '')}
              tokenName={Ftm.gasTokenName}
              tokenHref={Ftm.scanLink}
              patronHref={Ftm.nfpScanLink}
              tokenLock={Ftm.teamLock.replace('evm:', '')}
            />
            <Contracts
              title={Avax.display}
              img={Avax.tokenImage.replace('/public', '')}
              contractAddress={Avax.gasTokenAddress.replace('evm:', '')}
              lpAddress={Avax.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Avax.patronLaunced}
              patronAddress={''}
              tokenName={Avax.gasTokenName}
              tokenHref={Avax.scanLink}
              patronHref={''}
              tokenLock={Avax.teamLock.replace('evm:', '')}
            />
            <Contracts
              title={Movr.display}
              img={Movr.tokenImage.replace('/public', '')}
              contractAddress={Movr.gasTokenAddress.replace('evm:', '')}
              lpAddress={Movr.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Movr.patronLaunced}
              patronAddress={''}
              tokenName={Movr.gasTokenName}
              tokenHref={Movr.scanLink}
              patronHref={''}
              tokenLock={Movr.teamLock.replace('evm:', '')}
            />
            <Contracts
              title={Cro.display}
              img={Cro.tokenImage.replace('/public', '')}
              contractAddress={Cro.gasTokenAddress.replace('evm:', '')}
              lpAddress={Cro.liquidityPairs[0].address.replace('evm:', '')}
              patronTrue={Cro.patronLaunced}
              patronAddress={''}
              tokenName={Cro.gasTokenName}
              tokenHref={Cro.scanLink}
              patronHref={''}
              tokenLock={Cro.teamLock.replace('evm:', '')}
            />
          </FlexRow>
        ) : null}
        {tokenomics ? (
          <>
            <div className="InformationTitle">Tokenomics</div>
            <div className="InformationSubtitle"></div>
            <div className="InformationBody">
              <p>
                The GAS Token is a dividend paying token that offers static
                rewards in the native gas per blockchain.
              </p>
              <p>
                You will receive GAS Tokens as well as an equal 1:1 balance of
                GAS_Dividend_Tracker. DO NOT SEND THIS AWAY! YOU WILL NOT
                RECIEVE STATIC REWARDS!
              </p>
              <p>
                8% Reward in native gas per blockchain! As long as you hold GAS
                tokens you will start to earn native blockchain gas (BNB, MATIC,
                ETH, etc)
              </p>
              <p>
                4% Tax to underlying Liquidity. This ensures that the funds are
                always there for when you want to exit, as well as reducing the
                price impact upon volume. Along with this the liquidity is
                burned forever, so no one can remove GAS from the market.
              </p>
              <p>
                4% Tax to Developer, this is to ensure our cross-chain bridge
                has enough liquidity. Note: during the Genesis phase the
                Developer tax is 8% reducing 1% every 3-4 weeks.
              </p>
              <p>
                Static Rewards in Gas (Native to the Blockchain). These rewards
                are payed out on a maximum of 1hr timeframe, automatically by
                the contract. If you buy and sell before a distribution you will
                not see any rewards earned. Distributions are done automatically
                by the contract.
              </p>
            </div>
          </>
        ) : null}
        {nfp ? (
          <>
            <div className="InformationTitle">Non-Fungible Patrons</div>
            <div className="InformationSubtitle">
              Patrons will be unique one-of-a-kind hand drawn & script generated
              NFTs that will help fund the bridge liquidities and have unique
              rewards to their owners.
            </div>
            <div className="InformationBody">
              <h1>Common Mint (500)</h1>
              <span>
                When held in the owners wallet they may use the cross-chain USDC
                Bridge at NO COST (transaction tax)
              </span>
              <span>
                Price Floor increases $25 every 125 minted starting at $25
              </span>
              <h1>Rare Mint (38)</h1>
              <span>
                When held in the owners wallet they may use the cross-chain USDC
                Bridge at NO COST (transaction tax)
              </span>
              <span>
                Rare Patrons can be staked in a rewards pool that is directly
                linked to a portion of the bridge tax accumulation. Rare Patrons
                earn an average of $46.8 Shares of USDC Per $1,000,000 USDC
                Taxed Transfer Volume.
              </span>
              <span>
                Price Floor Increases $39 every 1 minted starting at $250
              </span>
              <h1>Legendary Mint (12)</h1>
              <span>
                When held in the owners wallet they may use the cross-chain USDC
                Bridge at NO COST (transaction tax)
              </span>
              <span>
                Legendary Patrons can be staked in a rewards pool that is
                directly linked to a portion of the bridge tax accumulation.
                Legendary Patrons earn an average of $288.6 Shares of USDC Per
                $1,000,000 USDC Taxed Transfer Volume.
              </span>
              <span>
                Price Floor Increases $375 every 1 minted starting at $750
              </span>
            </div>
          </>
        ) : null}
        {fueltanks ? (
          <>
            <div className="InformationTitle">Fuel Tanks</div>
            <div className="InformationSubtitle">
              Fuel Tanks (otherwise popularly known as Staking Pools) allow
              users to Fuel Up!
            </div>
            <div className="InformationBody">
              <span>
                NOTE: STAKING GAS TOKENS TO FUEL TANKS WILL VOID ALL STATIC GAS
                REWARDS
              </span>
              <p>
                Fuel Tanks (otherwise popularly known as Staking Pools) allow
                users to Fuel Up! Fueling up does not allow you to gain static
                gas rewards that you otherwise would when holding the GAS token
                in your wallet. When deployed; we will run a constant of 4 Fuel
                Tanks:
              </p>
              <h3>Liquidity Provider (LP) “Dual Fuel” Fuel Tanks</h3>
              <span>
                Provide GAS LP Tokens and earn GAS Tokens + Shares of USDC
              </span>
              <span>3% Burn Fee on Entry</span>
              <h3>GAS Token “GAS MAXIMIZER” Fuel Tanks</h3>
              <span>Provide GAS Tokens and earn GAS Tokens</span>
              <span>5% Burn Fee on Entry</span>
              <h3>USDC “Fuel-Up!” Fuel Tanks</h3>
              <span>Provide USDC and earn GAS Tokens</span>
              <span>5% Deposit Fee on Entry</span>
              <h3>GAS Token “Stable-Up!” Fuel Tanks</h3>
              <span>Provide GAS Tokens and earn Shares of USDC</span>
              <span>4% Burn Fee, 1% Deposit Fee on Entry</span>
            </div>
          </>
        ) : null}
        {bridge ? (
          <>
            <div className="InformationTitle">Bridge Assets</div>
            <div className="InformationSubtitle">Were going everywhere!</div>
            <div className="InformationBody">
              <p>
                Were building a bridge to go to every Blockchain. For this we
                need a lot of liquidity. At inception of our GAS Token the
                Developer Tax will be 8%, reducing by 1% every 3-4 weeks, down
                to 4%. This is to help gather the funds for the bridge.
              </p>
              <p>
                The bridge will be built for use for stable coins (USDC, USDT,
                DAI) If you are a holder of $500 VALUE in GAS tokens on the
                blockchain you are migrating from (eg: bscGAS holders using the
                BSC {'>'} Other Network Bridge); OR a Holder of Non-Fungible
                Patrons (of any rarity), you will not be charged a fee.
              </p>
              <p>
                The bridge will have a sliding scale fee. 0.5% {'>'} 0.175% Here
                is how it will look;
              </p>
              <span>
                0.5% FEE: $25-$2500 Transfer Value = $0.12c-$12.50 in Fees
              </span>
              <span>
                0.4% FEE $2,501-$10,000 Transfer Value = $10-$40 in Fees
              </span>
              <span>
                0.3% FEE $10,001-$50,000 Transfer Value = $30-$150 in Fees
              </span>
              <span>
                0.2% FEE $50,001-$100,000 Transfer Value = $100-$200 in Fees
              </span>
              <span>
                0.175% FEE $100,001-$250,000 Transfer Value = $175.00-$437.50 in
                Fees
              </span>
              <p>
                100% of all fees generated will be used to fund token holders,
                non-fungible patron rewards, and fuel tanks.
              </p>
            </div>
          </>
        ) : null}
        {locker ? (
          <>
            <div className="InformationTitle">Lock Tokens</div>
            <div className="InformationSubtitle"></div>
            <div className="InformationBody">
              <p>
                An already existing concept in the space of crypto, token
                lockers/liquidity lockers are nothing new. However, they
                currently operate via parties who do not wish to share the
                profits from the widely, and overly charged service.
              </p>
              <p>
                Our plan is to offer this service on every evm-based blockchain
                at a fraction of any competitor; and use these funds to buy the
                respective GAS token per blockchain (triggering a reward cycle
                for holders), and send these tokens to the burn pit (allowing a
                lasting increase in token value + increased reward
                distribution).
              </p>
              <h1>How They Work:</h1>
              <p>
                Token Lockers are a smart contract that allow the user
                interacting to store tokens for a set amount of time. It is a
                trustless system allowing for the project manager of any project
                to safely lock tokens or liquidity for any amount of time they
                wish. There are no 3rd parties or operators who can interact
                with the locker; and can only ever be claimed by the original
                owner.
              </p>
            </div>
          </>
        ) : null}
        {bulksend ? (
          <>
            <div className="InformationTitle">Send Tokens</div>
            <div className="InformationSubtitle"></div>
            <div className="InformationBody">
              <p>
                An already existing concept in the space of crypto, token bulk
                senders are nothing new. They offer ease of access for anyone to
                send any amount of tokens to a list of users without needing to
                do it one by one, saving loads of time for projects that wish to
                airdrop; or anyone hosting giveaways!{' '}
              </p>
              <p>
                Our plan is to offer this service on every evm-based blockchain
                at a fraction of any competitor; and use these funds to buy the
                respective GAS token per blockchain (triggering a reward cycle
                for holders), and send these tokens to the burn pit (allowing a
                lasting increase in token value + increased reward
                distribution).
              </p>
              <h1>How They Work:</h1>
              <p>
                Bulk Sender Contracts allow the user to send a ERC20 or ERC721
                tokens to a bulk quantity of addresses in one transaction rather
                than doing it one at a time. The contract never holds or stores
                any tokens, it simply just allows the user to send to multiple
                addresses without multiple transactions.
              </p>
            </div>
          </>
        ) : null}
        {shares ? (
          <>
            <div className="InformationTitle">Shares</div>
            <div className="InformationSubtitle">
              Shares are a unique way to provide liquidity to network bridges
            </div>
            <div className="InformationBody">
              <p>
                Shares are conversions of single assets that directly add to
                bridge liquidity, allowing for anyone to provide to the
                liquidity pool for the network, and in return they receive
                Shares.
              </p>
              <p>
                Shares represent an individual’s amount of assets in the
                liquidity pool. Shares can be converted back at any time*, and
                will take a 0.2% fee in the process.
              </p>
              <p>
                Share Holders directly earns 8% of all bridge transactions back
                in Shares; and being a Share Holder to one specific liquidity
                pool does not restrict the Share Holder to rewards only from the
                underlying pool. This will incentivize being a Share Holder for
                lower traffic bridges. Rewarding in Shares allows for a positive
                cycle of liquidity being added to the bridge.
              </p>
              <p>
                Shares will allow for The Gas Station to greatly increase the
                rate of speed at which we launch bridges between networks.
              </p>
              <p>
                Shares will be the currency used for purchases between Adherence
                of GAS Tokens, and Mining Passes.
              </p>
              <p>
                Fuel Tanks that reward USDC will be transitioning to rewarding
                Shares of USDC.
              </p>
              <p>
                * IMPORTANT: During early stages of Bridge Launches the
                Liquidity Pools are small. This can lead to a delay in
                converting Shares back to Assets; someone bridges to the network
                you provided Assets on and you cannot convert your Shares back
                for the time being. Your assets are never lost, they are just
                delayed, the assets taken out by the bridging user was
                supplemented on another network. Usually, liquidity pools
                rebalance quickly, so it should only be a short delay for users
                whose assets are stuck in Shares. In the event of Shares being
                unconvertable for up to 24hrs please contact the development
                team.
              </p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default InformationContent;
