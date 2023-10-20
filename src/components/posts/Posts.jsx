import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
