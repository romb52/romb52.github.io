import { FaHome } from 'react-icons/fa';
import styles from './Header.module.css';
import { Link } from "react-router-dom";
//import { useState } from 'react';

export default function Header() {
 
  return (
    <header >
      <div className='container; d-flex align-items-center ' >
        <h2>Header</h2>
        <Link className={styles.linkHome} to='/' ><FaHome className={styles.homeIcon} /></Link>
      </div>
    </header>
  );
}