import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GiBookCover } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import styles from './Header.module.css';


export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState);
  };

  return (
    <header>
      <div className={styles.headerTop}>
        <div className='container d-flex align-items-center gap-3'>
          <Link className={styles.logo} to="/book-library" >
            <GiBookCover size={30} />
            <h2>LIBRARY</h2>
          </Link>
        </div>
      </div>
      <div className={styles.headerMenu}>
        <div className='container'>
          <div className={styles.wrap}>
            <div className='mobileMenuIcon' onClick={toggleMobileMenu}>
              <IoMenu style={{ fontSize: '30px', border: 'none' }} />
            </div>
            <div className={`mobileMenu ${mobileMenuOpen ? 'active' : ''}`}>
              <Link onClick={toggleMobileMenu} to="/book-library" className={location.pathname === '/book-library' ? styles.active : ''}>Books</Link>
              <Link onClick={toggleMobileMenu} to="/book-library/visitors" className={location.pathname === '/book-library/visitors' ? styles.active : ''}>Visitors</Link>
              <Link onClick={toggleMobileMenu} to="/book-library/cards" className={location.pathname === '/book-library/cards' ? styles.active : ''}>Cards</Link>
              <Link onClick={toggleMobileMenu} to="/book-library/statistics" className={location.pathname === '/book-library/statistics' ? styles.active : ''}>Statistics</Link>
            </div>
            <div className='gap-5 mainMenu'>
              <Link to="/book-library" className={location.pathname === '/book-library' ? styles.active : ''}>Books</Link>
              <Link to="/book-library/visitors" className={location.pathname === '/book-library/visitors' ? styles.active : ''}>Visitors</Link>
              <Link to="/book-library/cards" className={location.pathname === '/book-library/cards' ? styles.active : ''}>Cards</Link>
              <Link to="/book-library/statistics" className={location.pathname === '/book-library/statistics' ? styles.active : ''}>Statistics</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
