import { useLayoutEffect, memo, useRef } from 'react';
import glyphData from './glyphData.json';

function Glyph({ changeRate }) {
  const { glyphs } = glyphData;
  const containerRef = useRef();
  const rate = (changeRate * 1000);
  const rateHalf = Math.floor(rate / 2);
  const timeout = Math.floor((Math.random() * (rate - rateHalf + 1)) + rateHalf);
  const getGlyph = () => {
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  };
  
  useLayoutEffect(() => {
    const timer = setInterval(() => {
      if (containerRef && containerRef.current) {
        containerRef.current.innerHTML = getGlyph();
      }
    }, timeout);

    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div className="glyph" ref={containerRef} >{getGlyph()}</div>
  );
}

export default memo(Glyph);