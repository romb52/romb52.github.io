import React from 'react';
import styles from './Pag.module.css';
import { pag } from '../../share/data';

function Pag({ listPerPage, activePage, changePage }) {
  return (
    <div className={styles.pag}>
      {pag(listPerPage).map((item) => (
        <span
          onClick={() => changePage(item)}
          className={`${activePage === item ? styles.active : null}`}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default Pag;