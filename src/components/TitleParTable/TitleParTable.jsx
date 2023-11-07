import styles from '../App/App.module.css';

export default function TitleParTable() {
  return (
    <div key='abcde' className={`${styles.item} ${styles.itemTitle}`}>
      <p>#</p>
      <p>Name</p>
      <p>Articule</p>
      <p>Count</p>
      <p>AVG Price</p>
      <p>Sum</p>
    </div>
  );
}
