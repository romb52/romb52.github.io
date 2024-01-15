import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../share/reducers/auth.reducer';
import { IoCreateOutline } from 'react-icons/io5';
import styles from './Header.module.css';
import logo from '../../share/img/logo.svg';

export default function Header() {
  const { token, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
        <div><img src={logo} className={styles.logo} alt="logo" /></div>      
          <div className='d-flex gap-4'>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
            {!token && token === '' && (
              <>
                <Link to="/signin" className={location.pathname === '/signin' ? styles.active : ''}>SignIn</Link>
            <Link to="/signup" className={location.pathname === '/signup' ? styles.active : ''}>SignUp</Link>
              </>
            )}

            {token && token !== '' && (
              <>
                <p>{username}</p>
                <Link to='/create-post'>
                  <IoCreateOutline />
                </Link>
                <p className={styles.logout} onClick={() => dispatch(logout())}>
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
