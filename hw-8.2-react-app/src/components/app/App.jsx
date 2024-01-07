import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { data } from "../../share/data";
import Pag from '../pag/Pag';
import Item from '../item/item';

const listPerPage = 6;

function App() {

  const [startindex, setStartIndex] = useState(0);
  const [list, setList] = useState(data.slice(startindex, startindex + listPerPage));
  const [activePage, setActivePage] = useState(1);
  const [openShop, setOpenShop] = useState({ isOpen: false, productName: "" });

  useEffect(() => {
    setList(data.slice(startindex, startindex + listPerPage));
  }, [startindex]);

  const changePage = (item) => {
    setStartIndex((item - 1) * listPerPage);
    setActivePage(item);
  };

  const showShop = (name) => {
    setOpenShop((prev) => {
      if (prev.productName !== name) {
        return {
          isOpen: true,
          productName: name
        };
      } else {
        return {
          isOpen: !prev.isOpen,
          productName: prev.isOpen ? "" : name
        };
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="container">
        <div className={styles.wrap}>
          <div
            key={'firstline'}
            className={`${styles.item} ${styles.itemTitle}`}
          >
            <p>#</p>
            <p>Name</p>
            <p>Acticule</p>
            <p>Count</p>
            <p>AVG price</p>
            <p>Sum</p>
          </div>
          {list.map((item, i) => {
            return (
              <Item key={`${item.name}${item.articule}`} item={item} index={i} startindex={startindex} showShop={showShop} openShop={openShop} />
            );
          })}
        </div>
        <Pag listPerPage={listPerPage} activePage={activePage} changePage={changePage} />
      </div>
    </div>
  );
}

export default App;
