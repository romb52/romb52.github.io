import { useState } from 'react';
import styles from './Main.module.css';


const Main = ({ lang, changeLang }) => {
    const data = {
        'uk': ["Яблуко", "Банан", "Апельсин"],
        'en': ["Apple", "Banana", "Orange"]
    }
    const [list, setList] = useState(data[lang]);
    

    return (
        <>
            <div className={`container ${styles.mainwrap}`}>
                <div className={styles.list}>
                    {list.map((item, i) => <p key={`item - ${i + 1}`}>{item}</p>)}
                </div>
            </div>
        </>
    )
}
export default Main;