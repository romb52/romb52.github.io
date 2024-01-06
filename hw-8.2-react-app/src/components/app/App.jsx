
import { useState } from 'react';
import styles from './App.module.css';
import { data } from "../../share/data";
import { result } from '../../share/data';

function App() {
  const [list, setList] = useState(data);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="container">
        <div className={styles.wrap}>
          <div className={`${styles.item} ${styles.itemTitle}`}>
            <p>#</p>
            <p>Name</p>
            <p>Acticule</p>
            <p>Count</p>
            <p>AVG price</p>
            <p>Sum</p>
          </div>
          {list.map((item, i) => {
            const res= result(item.shop);
            return (
              <div key={`${item.name}${item.articule}`} className={styles.item}>
                <p>{i + 1}</p>
                <p >{item.name}
                </p>
                <p>{item.articule}</p>
                <p>{res.count}</p>
                <p>{res.avg}</p>
                <p>{res.sum}</p>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
