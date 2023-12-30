import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Posts.module.css'
import { AiFillLike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const res = await axios.get('https://dummyjson.com/posts');
      setPosts(res.data.posts);
    }
    getPosts();
  }, []);

  return (
    <div >
      <h1>Posts</h1>
      <div className={styles.posts}>
        {posts.map((item) => (
          <Card  key={item.id}>
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
              <Button variant="primary">See more...</Button>
            </Card.Body>
          </Card>

          // <div className={styles.post} key={item.id}>
          //   <h4>{item.title}</h4>
          //   <p>{item.body.slice(0, 40)}...</p>
          //   {item.tags.map((tag, index) => (
          //     <span className={styles.tags} key={index}>
          //       #{tag}
          //       {index !== item.tags.length - 1 && " "}
          //     </span>
          //   ))}
          //   <p className={styles.likes}><AiFillLike size={20} />{item.reactions}</p>
          //   <button className={styles.btn}>See more...</button>
          // </div>
        ))}
      </div>
    </div>
  );
}