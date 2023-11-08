import styles from './App.module.css'
import Header from '../header/Header'
import Main from '../main/Main';
import Footer from '../footer/Footer';

function App() {
  return (
    <div className={`container ${styles.page}`}>
    <Header/>
    <Main/>
    <Footer/>    
    </div>
  );
}

export default App;
