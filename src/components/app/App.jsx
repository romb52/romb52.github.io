import { useState } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './App.module.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [list, setList] = useState(['apple', 'banana', 'orange']);

  document.body.setAttribute('data-theme', `${isDark ? 'dark' : ''}`);

  const changeTheme = () => {
    setIsDark((prev) => !prev);
    document.body.setAttribute('data-theme', `${isDark ? 'dark' : ''}`);
  };

  const deleteItem = (item) => {
    const updatedList = list.filter((el) => el !== item);
    setList(() => updatedList);
  };

  console.log(document.documentElement.lang)

  return (
    <>
      <Header changeTheme={changeTheme} />
      <section>
        <div className='container'>
          <div className={styles.list}>
            {list.map((item, i) => (
              <div key={`item-${i + 1}`}>
                <p>{item}</p>
                <button onClick={() => deleteItem(item)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer isDark={isDark} />
    </>
  );
}

export default App;
