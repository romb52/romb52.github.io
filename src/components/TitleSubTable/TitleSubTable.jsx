import styles from '../App/App.module.css';

export default function TitleSubTable() {
  return (
    <div className={`${styles.item} ${styles.itemTitle}`} key='titleaa'>
      <p>#</p>
      <p>Shop</p>
      <p>Count</p>
      <p>Price</p>
      <p>Sum</p>
    </div>
  );
}
