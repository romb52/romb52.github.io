import React from 'react';
import styles from '../app/App.module.css';
import { result } from '../../share/data';

function Item({ item, index, startindex, showShop, openShop }) {
  const res = result(item.shop);

  return (
    <>
      <div
        onClick={() => showShop(item.name)}
        key={`${item.name}${item.articule}`}
        className={styles.item}
      >
        <p>{startindex + index + 1}</p>
        <p>{item.name}</p>
        <p>{item.articule}</p>
        <p>{res.count}</p>
        <p>{res.avg}</p>
        <p>{res.sum}</p>
      </div>
      <div
        key={item.name}
        className={`${styles.shop} ${item.name === openShop.productName ? styles.active : null}`}
      >
        <div
          key={'firstlineshop'}
          className={`${styles.item} ${styles.itemTitle}`}
        >
          <p>#</p>
          <p>Name</p>
          <p>Count</p>
          <p>Price</p>
          <p>Sum</p>
        </div>
        {item.shop.map((el, i) => (
          <div
            key={i + 1}
            className={styles.item}
          >
            <p>{i + 1}</p>
            <p>{el.shop_name}</p>
            <p>{el.count}</p>
            <p>{el.price}</p>
            <p>{(el.price * el.count).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Item;