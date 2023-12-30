import { translate } from '../../share/translate';
import styles from './Header.module.css';
import { Button, Form } from 'react-bootstrap';

export default function Header({ changeTheme, openModal, lang, changeLang, isDark }) {

  return (
    <header >
      <div className={`container ${styles.headerContainer}`}>

        <div className={styles.switch}>
          <span>{translate[lang]['dark']}</span>
          <Form.Check onChange={() => changeTheme()} type="switch" checked={!isDark} />
          <span>{translate[lang]['light']}</span>
        </div>

        <Button variant="info" onClick={() => openModal()}>
          {translate[lang]['contact-me']}
        </Button>

        <div className={styles.switch}>
          <span>en</span>
          <Form.Check onChange={() => changeLang()} type="switch" id="custom-switch" checked={lang === 'uk'} />
          <span>uk</span>
        </div>
      </div>
    </header>
  );
}