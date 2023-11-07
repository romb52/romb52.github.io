import { useEffect, useState } from 'react';
import { listPerPage, sortData, countResult } from '../../share/data';
import styles from './App.module.css';
import Pag from '../Pag/Pag';
import TitleParTable from '../TitleParTable/TitleParTable';
import SubTable from '../SubTable/SubTable';
import TableItem from '../TableItem/TableItem';
import Search from '../Search/Search';

export default function App() {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [isAZ, setIsAZ] = useState(true);
  const [startindex, setStartIndex] = useState(0);

  const data =
    sortColumn === ''
      ? countResult(search)
      : sortData(isAZ, sortColumn, search);
  const [list, setList] = useState(
    data.newData.slice(startindex, startindex + listPerPage)
  );

  const [activePage, setActivePage] = useState(1);
  const [openShop, setOpenShop] = useState({ isOpen: false, productName: '' });

  useEffect(() => {
    const data =
      sortColumn === ''
        ? countResult(search)
        : sortData(isAZ, sortColumn, search);
    setList(data.newData.slice(startindex, startindex + listPerPage));
  }, [startindex, sortColumn, isAZ, search]);

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

  const changeSort = (isAZ, name) => {
    setSortColumn(name);
    setIsAZ(isAZ);
  };

  const getSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className='container'>
      <Search getSearch={getSearch} />
      <div className={styles.wrap} key='d1'>
        <TitleParTable
          changeSort={changeSort}
          sortColumn={sortColumn}
          isAZ={isAZ}
        />
        {list.map((item, i) => {
          return (
            <div key={`${item.name}${item.articule}`}>
              <TableItem
                item={item}
                i={i}
                showShop={showShop}
                startindex={startindex}
                openShop={openShop}
              />
              <SubTable item={item} i={i} openShop={openShop} />
            </div>
          );
        })}
      </div>
      <Pag activePage={activePage} changePage={changePage} pag={data.pagList} />
    </div>
  );
}
