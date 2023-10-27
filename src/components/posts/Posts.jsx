import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Pagination } from 'react-bootstrap';
import { translate } from '../../share/translate';
import styles from './Posts.module.css';
import { Link } from 'react-router-dom';
import { withLayout } from '../layout/Layout';
import { LIMIT } from '../../share/constants';


function Posts({ lang }) {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${
          (active - 1) * LIMIT
        }`
      );
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
    <section>
      <div className='container'>
        <h1>Posts</h1>
        <div className={styles.wrap}>
          {posts.map((item) => (
            <Card key={item.id}>
              {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.body.slice(0, 100)}...</Card.Text>
                <Link to={`/post/${item.id}`}>
                  <Button variant='primary' className='mt-3'>
                    {translate[lang]['more']}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Pagination className='mt-5'>
          {pages.map((item) => (
            <Pagination.Item
              key={item}
              active={active === item}
              onClick={() => setActive(item)}
            >
              {item}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </section>
  );
}
export default withLayout(Posts);
