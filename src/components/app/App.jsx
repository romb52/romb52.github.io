import { useEffect, useState } from 'react';
import { data, result, listPerPage } from '../../share/data';
import styles from './App.module.css';
import Pag from '../Pag/Pag';
import TitleParTable from '../TitleParTable/TitleParTable';
import SubTable from '../SubTable/SubTable';
import TableItem from '../TableItem/TableItem';

export default function App() {
  const [startindex, setStartIndex] = useState(0);
  const [list, setList] = useState(
    data.slice(startindex, startindex + listPerPage)
  );
  const [activePage, setActivePage] = useState(1);
  const [openShop, setOpenShop] = useState({ isOpen: false, productName: '' });

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
          productName: name,
        };
      } else {
        return {
          isOpen: !prev.isOpen,
          productName: name,
        };
      }
    });
  };

  return (
    <div className='App'>
      <div className={styles.wrap} key='d1'>
        <TitleParTable />
        {list.map((item, i) => {
          return (
            <div key={`${item.name}${item.articule}`}>
              <TableItem
                item={item}
                i={i}
                res={result(item.shop)}
                showShop={showShop}
                startindex={startindex}
                openShop={openShop}
              />
              <SubTable item={item} i={i} openShop={openShop} />
            </div>
          );
        })}
      </div>
      <Pag activePage={activePage} changePage={changePage} />
    </div>
  );
}
