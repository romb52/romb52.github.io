import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withLayout } from '../../components/Main/Main';
import { fetchDeletePost, fetchPosts } from '../../share/api/posts.api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { VscTrash} from 'react-icons/vsc';
import { FaEdit } from "react-icons/fa";
import styles from './Home.module.css';

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
                      <div className="d-flex justify-content-between">
                      <div
                        onClick={async() => {
                          await dispatch(fetchDeletePost({ slug: item.slug }));
                          await dispatch(fetchPosts())
                        }}
                      >
                        <VscTrash  className={styles.trash}/>
                      </div> <div><FaEdit className={styles.edit}/></div> </div>
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
