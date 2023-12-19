import styles from './Product.module.css';
import React from 'react';


interface ProductProps {
    productItem: {
      img: string;
      title: string;
      autor: string;
      category: string;
      numbOfPages: string;
      description: string;
    };
  }
  
  const Product: React.FC<ProductProps> = ({ productItem }) => {
    return (
      <div className={styles.productDescr}>
        <h2><span>Назва:</span> {productItem.title}</h2>
        <p>Автор: {productItem.autor}</p>
        <p>Жанр: {productItem.category}</p>
        <p>Кількість сторінок: {productItem.numbOfPages}</p>
        <p>Опис книги: {productItem.description}</p>
      </div>
    );
  };
  
  export default Product;