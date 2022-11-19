import { useLayoutEffect, useState, useEffect } from 'react'
import RainDrop from './RainDrop';
import './App.scss';

function App() {
  const [emWidth, setEmWidth] = useState(0);
  const [emHeight, setEmHeight] = useState(0);
  const [fontSize, setSetFontSize] = useState(16);
  const [changeRate, setChangeRate] = useState(60);
  const [speed, setSpeed] = useState(20);
  const [menuOpen, openMenu] = useState(false);

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
    drops.push(<RainDrop changeRate={changeRate} speed={speed} key={key} emHeight={emHeight} />);
  }

  return (
    <div style={{ fontSize }} className="app" onClick={() => { openMenu(false) }}>
      {drops}
      <div className={`options-menu-button ${menuOpen ? 'open' : ''}`} onClick={evt => { evt.stopPropagation(); openMenu(!menuOpen) }}>
        <div class="label">menu</div>
        <div className="inputs">
          <label onClick={evt => evt.stopPropagation()}>
            Font Size
            <input onBlur={handleFontSize} defaultValue={fontSize} />
          </label>
          <label onClick={evt => evt.stopPropagation()}>
            Rain Delay
            <input onBlur={handleSetSpeed} defaultValue={speed} />
          </label>
          <label onClick={evt => evt.stopPropagation()}>
            Character Change Rate
            <input onBlur={handleCharacterRate} defaultValue={changeRate} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
