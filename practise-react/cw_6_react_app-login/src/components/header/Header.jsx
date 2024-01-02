import { translate } from '../../share/translate';
import Menu from '../menu/Menu';
import styles from './Header.module.css';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header({ changeTheme, openModal, lang, changeLang, isDark }) {

  return (
    <header >
      <div className={`container ${styles.headerContainer}`}>
        <Menu/>
        <div className='d-flex gap-4 align-items-center'>
          <div className={styles.switch}>
            <span>{translate[lang]['dark']}</span>
            <Form.Check className={styles.formSwitch} onChange={() => changeTheme()} type="switch" checked={!isDark} />
            <span>{translate[lang]['light']}</span>
          </div>
          <Button variant="info" onClick={() => openModal()}>
            {translate[lang]['contact-me']}
          </Button>
          <div className={styles.switch}>
            <span>en</span>
            <Form.Check className={styles.formSwitch} onChange={() => changeLang()} type="switch" id="custom-switch" checked={lang === 'uk'} />
            <span>uk</span>
          </div>
          <Link to={'/'}><Button onClick={()=>{localStorage.removeItem('token')}}>Logout</Button></Link>
        </div>
      </div>
    </header>
  );
}