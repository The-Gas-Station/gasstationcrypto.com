import discord from './assets/discord.svg';
import twitter from './assets/twitter.svg';
import reddit from './assets/reddit.svg';
import web from './assets/web.svg';
import telegram from './assets/telegram.svg';
import {
  IoInformationCircleOutline,
  IoCalendar,
  IoLockClosed,
} from 'react-icons/io5';
const Details = () => {
  return (
    <div>
      <div className="body">
        <p className="dark1">
          Vivamus sollicitudin elit sit amet fermentum tincidunt. Aenean porta
          consectetur lorem, ac molestie felis iaculis vitae. Phasellus purus
          odio, varius semper nibh nec, fermentum finibus est. Nullam venenatis
          ...
        </p>
      </div>
      <div className="body">
        <div className="btn-row">
          <img src={web} />
          <img src={twitter} />
          <img src={discord} />
          <img src={telegram} />
          <img src={reddit} />
        </div>
      </div>
      <div className="break" />
      <div className="token-info">
        <p className="sm-dark">
          Token Info <IoInformationCircleOutline />
        </p>
        <div className="price">
          <p className="green">1 new</p>
          <p className="white">=</p>
          <p className="green">$0.20</p>
          <p className="white">|</p>
          <p className="green">5 new</p>
          <p className="white">per</p>
          <p className="green">1 busd</p>
        </div>
      </div>
      <div className="columns">
        <div className="item">
          <p className="sm-dark">
            Raise Start <IoCalendar />
          </p>
          <p className="white">8 Feb 2022 11:00 am - 16:00 pm UTC</p>
        </div>
        <div className="item">
          <p className="sm-dark">Intl Supply</p>
          <p className="white">2,000,000 $NEW</p>
        </div>
      </div>
      <div className="token-info">
        <p className="sm-dark">
          Vesting <IoLockClosed />
        </p>
        <div className="vesting">
          <p className="white">
            10% TGE unlock, 90% linear block-by-block unlock for 5 months
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
