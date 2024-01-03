import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  Button, Card } from 'react-bootstrap';
import styles from './Product.module.css';
import RatingStars from '../productInfo/RatingStars';
import { FaHome } from 'react-icons/fa';



export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setIsLoading(false);
                window.location.href = '/404';
            }
        }
        getProducts();
    }, [id]);


    return (<>
        {!isLoading && Object.keys(product).length > 0 && (
            <section >
                <div className='container'>
                    <h1>Product {product.id}</h1>
                    <div className={styles.product}>
                        <Card className={styles.card} key={product.id}>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title> <span className='text-primary'>{product.brand}</span> {product.title}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    <RatingStars rating={product.rating} />
                                    <span className='text-decoration-line-through text-secondary'>{product.price} ₴ </span>
                                    <h4 className='text-primary'>{(product.price - (product.price * product.discountPercentage * 0.01)).toFixed(2)} ₴</h4>
                                </Card.Text>
                                <Link  to='/'><Button className={styles.linkHome}><FaHome className={styles.homeIcon} />Home</Button></Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>
        )}
    </>
    );
}