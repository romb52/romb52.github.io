import Button from 'react-bootstrap/esm/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../share/hooks.redux';
import { logout } from '../../share/reducers/auth.reducer';
//import classNames from 'classnames';
import { useState, useEffect } from 'react';

export default function Header(): JSX.Element {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const [isActiveHome, setIsActiveHome] = useState(false);
  const [isActiveAuth, setIsActiveAuth] = useState(false);

  useEffect(() => {
    setIsActiveHome(location.pathname === '/');
    setIsActiveAuth(location.pathname === '/auth');
  }, [location.pathname]);

  return (
    <header>
      <div className='container h-container'>
        <NavLink to='/' className={isActiveHome ? 'active-link' : ''}>Home</NavLink>
        {token === '' ? (
          <NavLink to='/auth'  className={isActiveAuth  ? 'active-link' : ''}>Auth</NavLink>
        ) : (
          <Button onClick={(): void => { dispatch(logout()) }}>Logout</Button>
        )}
      </div>
    </header>
  );
}
