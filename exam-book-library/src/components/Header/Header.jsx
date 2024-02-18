
import { Link, useLocation } from 'react-router-dom';
import { GiBookCover } from "react-icons/gi";

import styles from './Header.module.css';


export default function Header() {
  const location = useLocation();
  return (
    <header>
      <div className={styles.headerTop}>
        <div className='container d-flex align-items-center gap-3'>
        <GiBookCover size={30}/>
          <h2>LYBRARY</h2>
        </div>
      </div>
      <div className={styles.headerMenu}>
        <div className='container'>
          <div className={styles.wrap}>
            <div className='d-flex gap-5'>
              <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Books</Link>
              <Link to="/visitors" className={location.pathname === '/visitors' ? styles.active : ''}>Visitors</Link>
              <Link to="/cards" className={location.pathname === '/cards' ? styles.active : ''}>Cards</Link>
              <Link to="/statistics" className={location.pathname === '/statistics' ? styles.active : ''}>Statistics</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
