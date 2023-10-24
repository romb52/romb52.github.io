import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { translate } from '../../share/translate';
import styles from './Posts.module.css';
import { Link } from 'react-router-dom';

export default function Posts({lang}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const res = await axios.get('https://dummyjson.com/posts');
      setPosts(res.data.posts);
    }
    getPosts();
  }, []);

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
                  <Button variant='primary' className='mt-3'>{translate[lang]['more']}</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
