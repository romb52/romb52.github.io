
import { Link, useLocation } from 'react-router-dom';


import styles from './Header.module.css';


export default function Header() {
  const location = useLocation();
  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <div className='d-flex gap-4'>
            <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Books</Link>
            <Link to="/visitors" className={location.pathname === '/visitors' ? styles.active : ''}>Visitors</Link>
            <Link to="/cards" className={location.pathname === '/cards' ? styles.active : ''}>Cards</Link>
            <Link to="/statistics" className={location.pathname === '/statistics' ? styles.active : ''}>Statistics</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
