//import styles from './App.module.css'
import Header from '../header/Header'
import Main from '../main/Main';
import { useSelector } from 'react-redux';


function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div data-theme={theme} >
      <Header />
      <Main />
    </div>
  );
}

export default App;
