//import styles from './Header.module.css';

export default function Header({ changeTheme }) {
  return (
    <header>
      <div className='container'>
        <button onClick={() => changeTheme()}>Change Theme</button>
      </div>
    </header>
  );
}
