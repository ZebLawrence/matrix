import { memo, useRef, useLayoutEffect } from 'react';
import glyphData from './glyphData.json';

function RainDrop({ emHeight, speed, changeRate, glyphShadow }) {
  const dropRef = useRef();
  const drop = [];
  const rand = Math.floor(Math.random() * 40);
  const { glyphs } = glyphData;
  const rate = (changeRate * 100);
  const rateHalf = Math.floor(rate / 2);
  const timeout = Math.floor((Math.random() * (rate - rateHalf + 1)) + rateHalf);

  for (let index = 0; index < emHeight; index++) {
    drop.push(
      `${glyphs[Math.floor(Math.random() * glyphs.length)]}`
    );
  }

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      if (dropRef && dropRef.current) {
        const deleteIndex = Math.floor(Math.random() * drop.length);
        const newGlyphIndex = Math.floor(Math.random() * glyphs.length);
        drop.splice(deleteIndex, 1, `${glyphs[newGlyphIndex]}`);
        dropRef.current.innerHTML = drop.join('\n');      
      }
    }, timeout);

    return () => {
      clearInterval(timer);
    };
  }, [emHeight, changeRate]);

  return (
    <div
      ref={dropRef}
      className={`rain-drop ${glyphShadow ? 'shadow' : ''}`}
      style={{ animationDuration: `${rand + speed}s` }}>
      {drop.join('\n')}
    </div>
  );
}

export default memo(RainDrop);
