import { memo } from 'react';
import Glyph from './Glyph';
import './rainDrop.scss';

function RainDrop({ emHeight, speed, changeRate }) {
  const glyphs = [];

  for (let index = 0; index < emHeight; index++) {
    glyphs.push(<Glyph changeRate={changeRate} key={`glyph-${index}`} />);
  }

  const rand = Math.floor(Math.random() * 40);
  const rainClass = `rain-drop raindrop-${rand}`;

  const animation = `raining infinite ${rand + speed}s`
// className={rainClass}
  return (
    <div className={rainClass} style={{ animationDuration: `${rand + speed}s` }}>
      {glyphs}
    </div>
  );
}

export default memo(RainDrop);
