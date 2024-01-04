import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Posts.module.css'
import { AiFillLike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { translate } from '../../share/translate';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function Posts({ lang }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get('https://dummyjson.com/posts');
        setPosts(res.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts. Please try again later.');
      }
    }
    getPosts();
  }, []);

  return (
    <section >
      <div className='container'>
        <h1>Posts</h1>
        {error ? (
          <div className={styles.error}>{error}<Link className={styles.linkHome} to='/'><FaHome className={styles.homeIcon} /></Link></div>
        ) : (
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
        )}
      </div>
    </section>
  );
}