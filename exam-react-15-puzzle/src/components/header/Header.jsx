import styles from './Header.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setAutoTheme } from '../../share/reducers/theme.reducer';
import { setBoardSize, } from '../../share/reducers/game.reducer';
import {toggleSound} from '../../share/reducers/sound.reducer';
import Form from 'react-bootstrap/Form';
import { TfiTimer } from "react-icons/tfi";
import { GiMove } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";
import { themeIcons } from "../../share/theme-icons";
import ToggleButton from 'react-bootstrap/ToggleButton';
import { GiSoundOn, GiSoundOff } from "react-icons/gi";




const Header = () => { 

    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const gameTime = useSelector((state) => state.game.gameTime);
    const clickCount = useSelector((state) => state.game.clickCount);
    const boardSize = useSelector((state) => state.game.boardSize);
    const bestTime = useSelector((state) => state.game[`bestTime${boardSize}`]); // Вибираємо дані з localStorage залежно від розміру дошки
    const minStep = useSelector((state) => state.game[`minStep${boardSize}`]);
    const soundOn = useSelector(state => state.sound.soundOn);

   
    const handleThemeChange = (theme) => {
        if (theme === 'auto') {
            dispatch(setAutoTheme());
        }
        else {
            dispatch(setTheme(theme));
        }
    };

    const changeBoardSize = (event) => {
        dispatch(setBoardSize(event.target.value));
    };

   const  changeSound = () =>{
    dispatch(toggleSound());
   }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60); // Отримання хвилин
        const remainingSeconds = seconds % 60; // Отримання залишкових секунд
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds; // Форматування секунд, щоб завжди було два символи
        return `${minutes}:${formattedSeconds}`; // Повернення часу у форматі "хвилини:секунди"
    };
    const formatedTime = formatTime(gameTime); // Форматування часу
    const formatedBestTime = formatTime(bestTime); // Форматування кращого часу



    return (
        <header>
            <div className="container">
                <div className={styles.headerwrap} >
                    <div key='inline-radio' >
                        <p className="mb-0 "><span className='hideIfMob'>Board Size</span></p>
                        <Form.Check
                            inline
                            label="3x3"
                            value="3"
                            name="boardSize"
                            type='radio'
                            onChange={changeBoardSize}
                        />
                        <Form.Check
                            inline
                            label="4x4"
                            value="4"
                            name="boardSize"
                            type='radio'
                            defaultChecked
                            onChange={changeBoardSize}
                        />
                    </div>
                    <div>
                        <p className="mb-0 d-flex align-items-center gap-1"><TfiTimer /><span className='hideIfMob'>Time:</span> {formatedTime}</p>
                        <p className="mb-0 d-flex align-items-center gap-1"><GiMove /><span className='hideIfMob'>Step:</span> {clickCount}</p>
                    </div>
                    <div className='records-block'>
                        <p className="mb-0 d-flex align-items-center gap-1"><FaTrophy /><span className='hideIfMob'>Best Time:</span>  {formatedBestTime} </p>
                        <p className="mb-0 d-flex align-items-center gap-1"><FaTrophy /><span className='hideIfMob'>Min Step:</span> {minStep}</p>
                    </div>
                    <Dropdown data-bs-theme={theme}>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">                       
                            {themeIcons[theme]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleThemeChange('auto')} active>
                                Auto
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleThemeChange('light')}>Light</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleThemeChange('dark')}>Dark</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleThemeChange('winter')}>Winter</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleThemeChange('summer')}>Summer</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ToggleButton type="checkbox" variant="secondary" id="tbg-btn-sound" value={soundOn ? 1 : 0} onChange={() => changeSound()}>
                        {soundOn ? <GiSoundOn /> : <GiSoundOff />}
                    </ToggleButton>
                </div>
            </div>
        </header>
    )
}
export default Header;