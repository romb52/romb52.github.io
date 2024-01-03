import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dataProductCategory.module.css';

const DataProductComponent = ({ handleCategoryClick }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories');
        setCategory(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        window.location.href = '/404';
      }
    }
    getProducts();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item ); // Установка активного элемента при клике
    handleCategoryClick(item); // Передача выбранной категории в родительский компонент
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {category.map((item, index) => (
        <li key={index} className={activeItem === item ? 'active' : ''}
          onClick={() => handleItemClick(item)}>{item}</li>
      ))}
      <li className={`${styles.allCategory} ${activeItem === null ? 'active' : ''}`}  onClick={() => handleItemClick(null)}>All category</li>
    </ul>
  );
};

export default DataProductComponent;