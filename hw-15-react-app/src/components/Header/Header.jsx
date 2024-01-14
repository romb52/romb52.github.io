import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../share/img/logo.svg';


export default function Header() {
  const location = useLocation();
  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <div><img src={logo} className={styles.logo} alt="logo" /></div>                   
          <div className="d-flex gap-4">
            <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
            <Link to="/signin" className={location.pathname === '/signin' ? styles.active : ''}>SignIn</Link>
            <Link to="/signup" className={location.pathname === '/signup' ? styles.active : ''}>SignUp</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
