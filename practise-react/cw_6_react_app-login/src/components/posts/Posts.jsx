import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Posts.module.css'
import { AiFillLike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { translate } from '../../share/translate';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

//const pages = [1, 2, 3];
const LIMIT = 6;



export default function Posts({ lang }) {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(2);
  const [pages, setPages] = useState([])
  useEffect(() => {
    async function getPosts() {
      //https://dummyjson.com/products?limit=10&skip=10
      const res = await axios.get(`https://dummyjson.com/posts?limit=${LIMIT}&skip=${(active -1)*LIMIT }`);
      setPosts(res.data.posts);
      const count = res.data.total;
      const arr = [];
      for (let i = 1; i <= Math.ceil(count / LIMIT); i++) {
        arr.push(i);
      }
      setPages(() => arr);
    }
    getPosts();
  }, [active]);

  return (
    <section >
      <div className='container'>
        <h1>Posts</h1>
        <div className={styles.posts}>
          {posts.map((item) => (
            <Card key={item.id}>
              <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.body.slice(0, 40)}...
                </Card.Text>
                <Card.Text>
                  {item.tags.map((tag, index) => (
                    <span className={styles.tags} key={index}>
                      #{tag}
                      {index !== item.tags.length - 1 && " "}
                    </span>
                  ))}
                </Card.Text>
                <Card.Text className={styles.likes}><AiFillLike size={20} />{item.reactions}</Card.Text>
                <Link to={`/post/${item.id}`}><Button variant="primary">{translate[lang]['more']}</Button></Link>

              </Card.Body>
            </Card>
          ))}
        </div>
        <Pagination className='mt-5'>{pages.map(item => <Pagination.Item key={item} active={item === active} onClick={() => setActive(item)}>
          {item}
        </Pagination.Item>,)}</Pagination>
      </div>
    </section>
  );
}