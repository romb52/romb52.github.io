import styles from './Header.module.css'
import dukeimg from '../../img/duke.png'

const Header = ()=> {
    return (
        <header className='container' >
            <div className={styles.headerwrap}>
                <h2>About my city Odessa</h2>
                <img src={dukeimg} alt="" width={'40px'} height={"40px"} />
            </div>
        </header>
    )
}
export default Header;