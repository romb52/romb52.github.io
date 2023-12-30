import { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import Posts from '../posts/Posts';


function App() {
  const [isModalOpen, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('contact');
  const [isDark, setIsDark] = useState(false);

  const [lang, setLang] = useState(
    localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : document.documentElement.lang
  );
  const changeLang = () => {
    const newLang = lang === 'uk' ? 'en' : 'uk';
    setLang(() => newLang);
  };

  const changeTheme = () => {
    setIsDark((prev) => !prev);
  };

  const openModal = (content = 'contact') => {
    setModal((prev) => !prev);
    switch (content) {
      case 'sale':
        setModalContent('sale');
        break;
      case 'posts':
        setModalContent('posts');
        break;
      default:
        setModalContent('contact');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);

  useEffect(() => {
    document.body.setAttribute('data-theme', `${isDark ? 'dark' : ''}`);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <>
      <Header
        changeTheme={changeTheme}
        openModal={openModal}
        lang={lang}
        changeLang={changeLang}
        isDark={isDark}
      />
      <section>
        <div className='container'>
          <Posts />
        </div>
      </section>
      <Footer isDark={isDark} />
      <Modal
        isModalOpen={isModalOpen}
        openModal={openModal}
        modalPosition={modalContent !== 'contact' && 'right'}      >
        {modalContent === 'contact' ? <h2>Contact Form</h2> : <h2>Sale</h2>}
      </Modal>
    </>
  );
}

export default App;