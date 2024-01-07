import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../share/AuthContext';
import Button from 'react-bootstrap/Button';
import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated, toggleAuth } = useAuth();

  const handleToggleAuth = () => {   
    toggleAuth();
  };

  return (
    <header className={styles.header}>
      <nav className='container'>
        <ul>
          <li>
            {isAuthenticated ? (
              <Link  to="/" onClick={handleToggleAuth}><Button variant="danger">Logout</Button></Link>
            ) : (
              <Link to="/" onClick={handleToggleAuth}><Button variant="success">Login</Button></Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;