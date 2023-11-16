import styles from './App.module.css'
import Header from '../header/Header'
import Main from '../main/Main';
import Footer from '../footer/Footer';
import { useState } from "react";

function App() {
  const [lang, setLang] = useState(document.documentElement.lang);
  const changeLang = () => {
      const newLang = lang === 'uk' ? 'en' : 'uk';
      setLang(() => newLang);
  }
  
  return (
    <div className={`container ${styles.page}`}>
    <Header lang={lang} changeLang={changeLang}/>
    <Main lang={lang} changeLang={changeLang}/>
    <Footer/>    
    </div>
  );
}

export default App;
