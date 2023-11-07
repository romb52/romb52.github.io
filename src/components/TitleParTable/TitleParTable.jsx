import styles from '../App/App.module.css';
import Arrows from '../Arrows/Arrows';

export default function TitleParTable({ changeSort, sortColumn, isAZ }) {
  return (
    <div key='abcde' className={`${styles.item} ${styles.itemTitle}`}>
      <p>#</p>
      <p>
        Name
        <Arrows
          changeSort={changeSort}
          name='Name'
          isActive={sortColumn === 'Name'}
          isAZ={isAZ}
        />
      </p>
      <p>
        Articule
        <Arrows
          changeSort={changeSort}
          name='Articule'
          isActive={sortColumn === 'Articule'}
          isAZ={isAZ}
        />
      </p>
      <p>
        Count
        <Arrows
          changeSort={changeSort}
          name='Count'
          isActive={sortColumn === 'Count'}
          isAZ={isAZ}
        />
      </p>
      <p>
        AVG Price
        <Arrows
          changeSort={changeSort}
          name='AVG Price'
          isActive={sortColumn === 'AVG Price'}
          isAZ={isAZ}
        />
      </p>
      <p>
        Sum
        <Arrows
          changeSort={changeSort}
          name='Sum'
          isActive={sortColumn === 'Sum'}
          isAZ={isAZ}
        />
      </p>
    </div>
  );
}
