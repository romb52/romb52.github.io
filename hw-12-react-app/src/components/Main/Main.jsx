import { useReducer, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { books } from '../../share/data';
import Arrows from '../Arrows/Arrows';
import styles from './Main.module.css';
import { reducer } from '../../share/reducer';

const initialForm = { title: '', author: '', count: 1 };
export default function Main() {
  const [state, dispatch] = useReducer(reducer, books);
  const [form, setForm] = useState(initialForm);
  const [changedId, setChangedId] = useState(0);

  const [sortColumn, setSortColumn] = useState('');
  const [isAZ, setIsAZ] = useState(true);

  const changeInput = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const sumbit = (e) => {
    e.preventDefault();
    const id = Date.now();

    if (changedId === 0) {
      const payload = { ...form, id };
      dispatch({ type: 'new_book', payload });
    } else {
      const payload = { ...form, id: changedId };
      dispatch({ type: 'change_book', payload });
      setForm(initialForm);
      setChangedId(0);
    }
  };

  const changeBook = (id) => {
    setChangedId(id);
    const book = state.find((item) => item.id === id);
    if (book) {
      setForm({ ...book });
    } else {
      setChangedId(0);
    }
  };

  const changeSort = (isAZ, name) => {
    setSortColumn(() => name);
    setIsAZ(() => isAZ);
    dispatch({
      type: 'sort',
      payload: { isAZ, name, isNumber: name === 'count' ? true : false },
    });
  };

  return (
    <section>
      <div className='container my-5'>
        <Form className='d-flex gap-5 mb-5' onSubmit={(e) => sumbit(e)}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder='Title'
              name='title'
              value={form.title}
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              placeholder='Author'
              value={form.author}
              name='author'
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='count'>
            <Form.Label>Count</Form.Label>
            <Form.Control
              type='number'
              value={form.count}
              placeholder='count'
              name='count'
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <div className={styles.grid}>
          <div key='head-book' className={styles.item}>
            <p>#</p>
            <p>
              Title
              <Arrows
                name='title'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>
              Author
              <Arrows
                name='author'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>
              Count
              <Arrows
                name='count'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>Delete</p>
            <p>Add</p>
            <p>Minus</p>
            <p>Change</p>
          </div>
          {state.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.count}</p>
              <Button
                variant='danger'
                onClick={() => dispatch({ type: 'delete', payload: book.id })}
              >
                Del
              </Button>
              <Button
                variant='success'
                onClick={() => dispatch({ type: 'add', payload: book.id })}
              >
                Add
              </Button>
              <Button
                onClick={() => dispatch({ type: 'minus', payload: book.id })}
              >
                Minus
              </Button>

              <Button variant='warning' onClick={() => changeBook(book.id)}>
                Change
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
