import { translate } from '../../share/translate';
import styles from './Header.module.css';

export default function Header({ changeTheme, openModal, lang, changeLang }) {

  return (
    <header>
      <div className={`container ${styles.headerContainer}`}>
        <button onClick={() => changeTheme()}>
          {translate[lang]['change-theme']}
        </button>

        <button onClick={() => openModal()}>
          {translate[lang]['contact-me']}
        </button>

        <button onClick={() => changeLang()}>{lang}</button>
      </div>
    </header>
  );
}
