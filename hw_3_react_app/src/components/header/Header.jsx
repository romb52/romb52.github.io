import styles from './Header.module.css'

//import { useState } from "react";


const Header = ({lang, changeLang}) => {   

    return (
        <header className='container' >
            <div className={styles.header}>
                <button onClick={() => changeLang()}>{lang==='en'?'Change Lang': 'Змінити мову'}</button>
                <h2>{lang}</h2>
            </div>
        </header>
    )
}
export default Header;