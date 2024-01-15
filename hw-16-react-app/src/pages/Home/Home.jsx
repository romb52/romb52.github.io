import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withLayout } from '../../components/Main/Main';
import { fetchDeletePost, fetchPosts } from '../../share/api/posts.api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { VscTrash } from 'react-icons/vsc';

function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <section>
      <div className='container'>
        {posts.length === 0 && <h1>Постів ще немає</h1>}
        {posts.length > 0 && (
          <>
            <h1>Пости</h1>
            <div className='grid'>
              {posts.map((item) => {
                return (
                  <Card key={item.id}>
                    {item.author.id === Number(id) && (
                      <div
                        onClick={async() => {
                          await dispatch(fetchDeletePost({ slug: item.slug }));
                          await dispatch(fetchPosts())
                        }}
                      >
                        <VscTrash />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Button variant='primary'>Див. пост</Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default withLayout(Home);
