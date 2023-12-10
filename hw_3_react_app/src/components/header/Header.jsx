import styles from './Header.module.css';
import { Button } from 'react-bootstrap';


const Header = ({lang, changeLang}) => {   

    return (
        <header  >
            <div className={styles.header}>
                <Button onClick={() => changeLang()}>{lang==='en'?'Change Lang': 'Змінити мову'}</Button>
                <h2>{lang}</h2>                
            </div>
        </header>
    )
}
export default Header;