import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

export default function Header() {

  // Use useSelector to access game time and click count from Redux state
  const gameTime = useSelector((state) => state.game.gameTime);
  const clickCount = useSelector((state) => state.game.clickCount);

  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <div>Logo</div>
          <div className='d-flex gap-4'>
            <Link to='/'>Home</Link>          
            <div>Time: {gameTime} seconds</div>
            <div>Move: {clickCount}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
