import App from '../app/App';
import { useLayoutEffect, useState, useMemo } from 'react';
import { GlobalContext } from '../../share/context';

export default function Main() {
  const [val1, setVal1] = useState(1);
  const [val2, setVal2] = useState(2);

  const res = useMemo(()=>val1 + val2, [val1, val2]);
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState({ wd: 0, hd: 0 });

  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const resize = () => {
    setSize(() => {
      return { wd: window.innerWidth, hd: window.innerHeight };
    });
  };
  useLayoutEffect(() => {
    resize();
    window.addEventListener('resize', resize);
  }, []);
  return (
    <GlobalContext.Provider value={{ theme, changeTheme, size }}>
      <App res={res} />
    </GlobalContext.Provider>
  );
}
