import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css'
// { AiFillLike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import RatingStars from '../productInfo/RatingStars';


const LIMIT = 6;


export default function Products() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState([])
  useEffect(() => {
    async function getProducts() {
      //https://dummyjson.com/products?limit=10&skip=10
      //https://dummyjson.com/posts?limit=${LIMIT}&skip=${(active -1)*LIMIT }
      const res = await axios.get(`https://dummyjson.com/products?limit=${LIMIT}&skip=${(active -1)*LIMIT }`);
      setProducts(res.data.products);
      const count = res.data.total;
      const arr = [];
      for (let i = 1; i <= Math.ceil(count / LIMIT); i++) {
        arr.push(i);
      }
      setPages(() => arr);
    }
    getProducts();
  }, [active]);


  return (
    <section >
      <div className='container'>
        <h1>Products</h1>
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
                <h4 className='text-primary'>{item.price} ₴ </h4>
                </Card.Text>      
                
                <Link to={`/product/${item.id}`}><Button variant="primary">More...</Button></Link>

              </Card.Body>
            </Card>
          ))}
        </div>
        <Pagination className='mt-5 justify-content-center'>{pages.map(item => <Pagination.Item key={item} active={item === active} onClick={() => setActive(item)}>
          {item}
        </Pagination.Item>,)}</Pagination>
      </div>
    </section>
  );
}