import App from '../App/App';
import { useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../share/context';

export default function Main() {
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
      <App />
    </GlobalContext.Provider>
  );
}
