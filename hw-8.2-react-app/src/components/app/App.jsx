
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { data } from "../../share/data";
import { result } from '../../share/data';
import { pag } from '../../share/data';

const listPerPage = 6;

function App() {

  const [startindex, setStartIndex] = useState(0);
  const [list, setList] = useState(
    data.slice(startindex, startindex + listPerPage)
  );
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
            const res = result(item.shop);
            return (
              <div key={`${item.name}${item.articule}`}>
                <div
                  onClick={() => showShop(item.name)}
                  key={`${item.name}${item.articule}`}
                  className={styles.item}
                >
                  <p>{startindex + i + 1}</p>
                  <p>{item.name}</p>
                  <p>{item.articule}</p>
                  <p>{res.count}</p>
                  <p>{res.avg}</p>
                  <p>{res.sum}</p>
                </div>
                <div
                  key={item.name}
                  className={`${styles.shop} ${item.name === openShop.productName ? styles.active : null
                    }`}
                >
                  <div
                      key={'firstlineshop'}
                      className={`${styles.item} ${styles.itemTitle}`}
                    >
                      <p>#</p>
                      <p>Name</p>
                      <p>Count</p>
                      <p>Price</p>
                      <p>Sum</p>
                    </div>
                  {item.shop.map((el, i) => (
                    <div
                      key={i + 1}
                      className={styles.item}
                    >
                      <p>{i + 1}</p>
                      <p>{el.shop_name}</p>
                      <p>{el.count}</p>
                      <p>{el.price}</p>
                      <p>{(el.price * el.count).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>);
          })}
        </div>
        <div className={styles.pag}>
          {pag(listPerPage).map((item) => (
            <span
              onClick={() => changePage(item)}
              className={`${activePage === item ? styles.active : null}`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
