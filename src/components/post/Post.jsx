import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { withLayout } from '../layout/Layout';

function Page() {
  const { id } = useParams();
  const [post, setPost] = useState({ id: -1 });

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get(`https://dummyjson.com/posts/${id}`);
        setPost(() => res.data);
      } catch (err) {
        setPost(() => {});
      }
    }

    getPost();
  }, [id]);

  return post && post.id ? (
    <section>
      <div className='container'>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </section>
  ) : (
    <Navigate to='/404' />
  );
}
export default withLayout(Page);
