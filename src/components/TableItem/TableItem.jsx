import styles from '../App/App.module.css';

export default function TableItem({
  item,
  i,
  res,
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
      <p>{res.count}</p>
      <p>{res.avg}</p>
      <p>{res.sum}</p>
    </div>
  );
}
