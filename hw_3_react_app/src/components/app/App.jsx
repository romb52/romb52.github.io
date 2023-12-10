import styles from './App.module.css'
import Header from '../header/Header'
import Main from '../main/Main';
import Footer from '../footer/Footer';
import { useState } from "react";

function App() {
  const [lang, setLang] = useState(document.documentElement.lang);
  const data = {
    'uk': ["Яблуко", "Банан", "Апельсин"],
    'en': ["Apple", "Banana", "Orange"]
  }
  const [list, setList] = useState(data[lang]);

  const changeLang = () => {
    const newLang = lang === 'uk' ? 'en' : 'uk';
    setLang(() => newLang);
    setList(() => data[newLang]);
  }

  return (
    <div className={` ${styles.page}`}>
      <Header lang={lang} changeLang={changeLang} />
      <Main lang={lang} changeLang={changeLang} list={list} />
      <Footer />
    </div>
  );
}

export default App;
