import styles from './Header.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, random, setAutoTheme  } from '../../reducers/theme.reducer';


const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);

    const handleThemeChange = (theme) => {
        if (theme === 'random') {
            dispatch(random());
        } else
        if (theme === 'auto') {
            dispatch(setAutoTheme());
        } 
        else {
            dispatch(setTheme(theme));
        }
    };
    return (
        <header>
            <div className={styles.headerwrap} >
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
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => handleThemeChange('random')}>Random theme</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    )
}
export default Header;