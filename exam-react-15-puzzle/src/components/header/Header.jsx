import styles from './Header.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setAutoTheme } from '../../share/reducers/theme.reducer';
import { setBoardSize, } from '../../share/reducers/game.reducer';
import Form from 'react-bootstrap/Form';


const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const gameTime = useSelector((state) => state.game.gameTime);
    const clickCount = useSelector((state) => state.game.clickCount);
    const boardSize = useSelector((state) => state.game.boardSize);
    const bestTime = useSelector((state) => state.game[`bestTime${boardSize}`]); // Вибираємо дані з localStorage залежно від розміру дошки
    const minStep = useSelector((state) => state.game[`minStep${boardSize}`]);
    

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

    

    return (
        <header>
            <div className={styles.headerwrap} >
                <div key='inline-radio' >
                    <p className="mb-0">Board Size</p>
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
                    <p className="mb-0">Time: {gameTime}</p>
                    <p className="mb-0">Step: {clickCount}</p>
                </div>
                <div className='records-block'>
                    <p className="mb-0">Best Time: {bestTime} </p>
                    <p className="mb-0">Min Step: {minStep}</p>
                </div>
                <Dropdown data-bs-theme={theme}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Theme
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
            </div>
        </header>
    )
}
export default Header;