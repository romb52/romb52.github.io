
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = ()=> {
    return (
        <header className='container' >                 
            <div className={styles.headerwrap}>
                <h2>Книга Майстер і Маргарита</h2>                
            </div>
        </header>
    )
}
export default Header;