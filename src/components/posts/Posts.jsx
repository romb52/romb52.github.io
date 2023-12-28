import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Posts.module.css'
import { AiFillLike } from "react-icons/ai";

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
          <div className={styles.post} key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.body.slice(0, 40)}...</p>
            {item.tags.map((tag, index) => (
              <span className={styles.tags} key={index}>
                #{tag}
                {index !== item.tags.length - 1 && " "}
              </span>
            ))}
            <p className={styles.likes}><AiFillLike size={20}/>{item.reactions}</p>
            <button className={styles.btn}>See more...</button>
          </div>
        ))}
      </div>
    </div>
  );
}
