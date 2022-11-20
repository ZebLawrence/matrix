import { useLayoutEffect, useState, useEffect } from 'react'
import RainDrop from './RainDrop';
import './App.scss';

function App() {
  const [emWidth, setEmWidth] = useState(0);
  const [emHeight, setEmHeight] = useState(0);
  const [fontSize, setSetFontSize] = useState(16);
  const [changeRate, setChangeRate] = useState(15);
  const [speed, setSpeed] = useState(20);
  const [menuOpen, openMenu] = useState(false);
  const [glyphShadow, setGlyphShadow] = useState(true);

  const setDimentions = () => {
    setEmHeight(Math.floor(document.documentElement.clientHeight / fontSize));
    setEmWidth(Math.floor(document.documentElement.clientWidth / fontSize));    
  };

  useLayoutEffect(() => {
    setDimentions();
    window.addEventListener('resize', setDimentions);
    
    return () => {
      window.removeEventListener('resize', setDimentions);
    }
  }, []);

  useEffect(() => {
    setDimentions();
  }, [fontSize]);

  const handleFontSize = evt => {
    const { currentTarget: { value } } = evt;
    setSetFontSize(Number(value));
  };

  const handleSetSpeed = evt => {
    const { currentTarget: { value } } = evt;
    setSpeed(Number(value));
  };

  const handleCharacterRate = evt => {
    const { currentTarget: { value } } = evt;
    setChangeRate(Number(value));
  };

  const drops = [];

  for (let index = 0; index < emWidth; index++) {
    const key = `rd-${index}`
    drops.push(
      <RainDrop
        glyphShadow={glyphShadow}
        changeRate={changeRate}
        speed={speed}
        key={key}
        emHeight={emHeight} />
    );
  }

  return (
    <div style={{ fontSize }} className="app" onClick={() => { openMenu(false) }}>
      {drops}
      <div className={`options-menu-button ${menuOpen ? 'open' : ''}`} onClick={evt => { evt.stopPropagation(); openMenu(!menuOpen) }}>
        <div class="label">{menuOpen ? 'options' : 'menu'}</div>
        <div className="inputs">
          <label title="Size in pixels of glyphs (smaller size may cause performance issues on slower machines)" onClick={evt => evt.stopPropagation()}>
            Glyph Size
            <input onBlur={handleFontSize} defaultValue={fontSize} />
          </label>
          <label title="Amount of time in seconds that the fastest drop takes to get from top to bottom" onClick={evt => evt.stopPropagation()}>
            Rain Delay
            <input onBlur={handleSetSpeed} defaultValue={speed} />
          </label>
          <label title="Rate that rendered glyphs randomly change (higher number is longer period before a change may happen)" onClick={evt => evt.stopPropagation()}>
            Glyph Change Rate
            <input onBlur={handleCharacterRate} defaultValue={changeRate} />
          </label>
          <label title="Add blue and red chromatic shift behind the glyphs (may cause performance issues on slower machines)" onClick={evt => evt.stopPropagation()}>
            Glyph Cromatic Aberation
            <input type="checkbox" onChange={() => { setGlyphShadow(!glyphShadow) }} defaultChecked={glyphShadow} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
