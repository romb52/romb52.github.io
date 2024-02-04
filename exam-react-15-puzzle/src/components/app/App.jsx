import Header from '../header/Header';
import Footer from '../footer/Footer';
import Game from '../game/Game';
import { useSelector } from 'react-redux';


function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div data-theme={theme} >
      <Header />
      <Game />
      <Footer/>
    </div>
  );
}

export default App;
