import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../share/reducers/game.reducer';
import { resetAllActiveCard } from '../../share/reducers/activeImages.reducer';
import logo from '../../share/img/logo.svg';
import {playSound} from '../../share/audioUtils';

export default function Header() {

  const startGame = 'shuffle-cards.mp3';

  const activeCards = useSelector((state) => state.activeImages);
  const gameTime = useSelector((state) => state.game.gameTime);
  const clickCount = useSelector((state) => state.game.clickCount);

  const dispatch = useDispatch();

  const handleHomeClick = () => {                     // reset states
    dispatch(resetAllActiveCard());
    dispatch(resetGame());
    playSound(startGame);
  };

  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <div><img src={logo} className={styles.logo} alt="logo" /></div>
          <div className={styles.winIndicator}>{activeCards.length===12 && 'You Win!!!'}</div>
          <div className='d-flex gap-4 align-items-center'>
            <Link to='/' onClick={handleHomeClick} className={styles.link}>Reset game</Link>          
            <div className={styles.gameIndicators}>Time: {gameTime} seconds</div>
            <div className={styles.gameIndicators}>Move: {clickCount}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
