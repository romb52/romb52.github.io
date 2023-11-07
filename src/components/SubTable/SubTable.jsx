import TitleSubTable from '../TitleSubTable/TitleSubTable';
import styles from '../App/App.module.css';

export default function SubTable({ item, i, openShop }) {
  return (
    <div
      key={`${item.name}-${i}`}
      className={`${styles.shop} ${
        item.name === openShop.productName && openShop.isOpen
          ? styles.active
          : null
      }`}
    >
      <TitleSubTable />
      {item.shop.map((el, i) => (
        <div key={i + 1} className={styles.item}>
          <p>{i + 1}</p>
          <p>{el.shop_name}</p>
          <p>{el.count}</p>
          <p>{el.price}</p>
          <p>{(el.price * el.count).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
