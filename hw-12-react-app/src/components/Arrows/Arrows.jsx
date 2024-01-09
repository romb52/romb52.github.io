import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { IconContext } from 'react-icons';
import styles from './Arrows.module.css';


export default function Arrows({  name, changeSort,  sortColumn, isAZ  }) {
  const isActive = sortColumn === name;
  return (
    <span className={styles['sort-wrap']}>
      <IconContext.Provider
        value={{ className: `${isActive && isAZ ? styles.active : null}` }}
      >
        <AiOutlineSortAscending onClick={() => changeSort(true, name)} />
      </IconContext.Provider>

      <IconContext.Provider
        value={{ className: `${isActive && !isAZ ? styles.active : null}` }}
      >
        <AiOutlineSortDescending onClick={() => changeSort(false, name)} />
      </IconContext.Provider>
    </span>
  );
}