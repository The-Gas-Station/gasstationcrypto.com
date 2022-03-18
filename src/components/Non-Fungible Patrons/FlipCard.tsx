import { useState } from 'react';
import { useSpring, a } from 'react-spring';

import styles from './styles.module.css';

export const FlipCard = ({ children0, stats }: any) => {
  const [flipped, set] = useState(false);
  const [flippedCard, flipCard] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div
      className={styles.container}
      onClick={() => {
        set((state) => !state);
        flipCard(!flippedCard);
      }}
    >
      {flippedCard ? (
        <a.div style={{ opacity: opacity.to((o) => 1 - o), transform }}>
          {children0}
        </a.div>
      ) : (
        <a.div
          style={{
            opacity,
            transform,
            rotateX: '180deg',
            width: '100%',
          }}
        >
          {stats}
        </a.div>
      )}
    </div>
  );
};
export default FlipCard;
