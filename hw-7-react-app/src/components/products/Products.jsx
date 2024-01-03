import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import RatingStars from '../productInfo/RatingStars';
import DataProductComponent from '../../share/dataProductCategory';

const LIMIT = 6;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        let url = 'https://dummyjson.com/products';
        if (selectedCategory) {
          url = `https://dummyjson.com/products/category/${selectedCategory}`;
        }
        const res = await axios.get(`${url}?limit=${LIMIT}&skip=${(active - 1) * LIMIT}`);
        setProducts(res.data.products);
        const count = res.data.total;
        const arr = [];
        for (let i = 1; i <= Math.ceil(count / LIMIT); i++) {
          arr.push(i);
        }
        setPages(arr);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
        window.location.href = '/404';
      }
    }
    getProducts();
  }, [active, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActive(1); // Сброс страницы при выборе новой категории
  };

  return (
    <>
      {!isLoading && Object.keys(products).length > 0 && (
        <section>
          <div className={`container ${styles.gridContainer}`}>
            <div>
              <h2>Category</h2>
              <div className={styles.leftSideBar}>
                <DataProductComponent handleCategoryClick={handleCategoryClick}  />
              </div>
            </div>
            <div className={styles.mainPart}>
              <h2>Products</h2>
              <div className={styles.products}>
                {products.map((item) => (
                  <Card className={styles.card} key={item.id}>
                   <Card.Body className='d-flex flex-column justify-content-between'>
                                        <Card.Title> <span className='text-primary'>{item.brand}</span> {item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description.slice(0, 50)}...
                                        </Card.Text>
                                        <Card.Text>
                                            <RatingStars rating={item.rating} />
                                            <span className='text-decoration-line-through text-secondary'>{item.price} ₴ </span>
                                            <h4 className='text-primary'>{(item.price - (item.price * item.discountPercentage * 0.01)).toFixed(2)} ₴ </h4>
                                        </Card.Text>

                                        <Link to={`/product/${item.id}`}><Button variant="primary">More...</Button></Link>

                                    </Card.Body>
                  </Card>
                ))}
              </div>
              <Pagination className='mt-5 justify-content-center'>
                {pages.map(item => (
                  <Pagination.Item
                    key={item}
                    active={item === active}
                    onClick={() => setActive(item)}
                  >
                    {item}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </section>
      )}
    </>
  );
}