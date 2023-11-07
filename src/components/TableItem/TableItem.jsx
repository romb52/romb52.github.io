import styles from '../App/App.module.css';

export default function TableItem({
  item,
  i,
  showShop,
  startindex,
  openShop,
}) {
  return (
    <div
      onClick={() => showShop(item.name)}
      key={`${item.name}${item.articule}`}
      className={`${styles.item} ${
        openShop.productName === item.name && openShop.isOpen
          ? styles.open
          : null
      }`}
    >
      <p>{startindex + i + 1}</p>
      <p>{item.name}</p>
      <p>{item.articule}</p>
      <p>{item.count}</p>
      <p>{item.avg}</p>
      <p>{item.sum}</p>
    </div>
  );
}
