import {  useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';
import Auth from '../Auth/Auth';
import Home from '../Home/Home';

export default function Main() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const changeAuth = (auth) => {
    setIsAuth(auth);
  }
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, [isAuth]);
  return isAuth ? (
    <Home />
  ) : (
    <>
      <div className='container'>
        <Button onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? 'Reg' : 'Login'}
        </Button>
      </div>
      <Auth isLogin={isLogin} changeAuth={changeAuth} />
    </>
  );
}
