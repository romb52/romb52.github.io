import { translate } from '../../share/translate';
import { Button, Form } from 'react-bootstrap';
import styles from './Header.module.css';
import Menu from '../menu/Menu';
import { useNavigate } from 'react-router-dom';

export default function Header({
  changeTheme,
  openModal,
  lang,
  changeLang,
  isDark,
}) {
  const navigate = useNavigate();
  return (
    <header>
      <div className={`container ${styles.headerContainer}`}>
        <Menu />
        <div className='d-flex gap-5 align-items-center'>
          <div className='d-flex gap-2 justify-content-center'>
            <span>{translate[lang]['dark']}</span>
            <Form.Check
              type='switch'
              checked={!isDark}
              onChange={() => changeTheme()}
            />
            <span>{translate[lang]['light']}</span>
          </div>
          <Button onClick={() => openModal()} variant='success'>
            {translate[lang]['contact-me']}
          </Button>
          <div className='d-flex gap-2 justify-content-center'>
            <span>en</span>
            <Form.Check
              type='switch'
              checked={lang === 'uk'}
              onChange={() => changeLang()}
            />
            <span>uk</span>
          </div>
          <Button onClick={()=> navigate('/')}>Logout</Button>
        </div>
      </div>
    </header>
  );
}
